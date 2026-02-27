import { Router, Request, Response, NextFunction } from 'express'
import { pool } from '../config/database'
import { validateStringInput } from '../utils/validation'

const router = Router()

// Good implementation routes (secure)
router.post('/sql/good', goodSQLLogin)

// Bad implementation routes (vulnerable)
router.post('/sql/bad', badSQLLogin)

// Good implementation - uses parameterized query
async function goodSQLLogin(request: Request, response: Response, next: NextFunction) {
  try {
    const { username, password } = request.body

    const usernameValidation = validateStringInput(username, 'username')
    const passwordValidation = validateStringInput(password, 'password')

    if (!usernameValidation.valid) {
      return response.status(400).json({ success: false, message: usernameValidation.error })
    }
    if (!passwordValidation.valid) {
      return response.status(400).json({ success: false, message: passwordValidation.error })
    }

    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1 AND password = $2',
      [usernameValidation.value, passwordValidation.value]
    )

    if (result.rows.length === 0) {
      return response.status(401).json({ success: false, message: 'Invalid credentials' })
    }

    response.json({ success: true, data: { message: 'Login successful', user: result.rows[0].username } })
  } catch (error) {
    console.error('Error during good SQL login:', error)
    response.status(500).json({ success: false, message: 'Login failed' })
  }
}

// Bad implementation - vulnerable to SQL injection
async function badSQLLogin(request: Request, response: Response, next: NextFunction) {
  try {
    const { username, password } = request.body

    // VULNERABLE: directly interpolating user input into query string
    const result = await pool.query(
      `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`
    )

    if (result.rows.length === 0) {
      return response.status(401).json({ success: false, message: 'Invalid credentials' })
    }

    response.json({ success: true, data: { message: 'Login successful', user: result.rows[0].username } })
  } catch (error) {
    console.error('Error during bad SQL login:', error)
    response.status(500).json({ success: false, message: 'Login failed' })
  }
}

export default router