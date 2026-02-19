import { Router, Request, Response, NextFunction } from 'express'
import { pool } from '../config/database'
import { validateStringInput } from '../utils/validation'

const router = Router()

// Good implementation routes (secure)
router.get('/xss/good/:id', goodGetXSSValue)
router.post('/xss/good', goodSaveXSSValue)

// Bad implementation routes (vulnerable)
//router.get('/xss/bad/:id', badGetXSSValue)
//router.post('/xss/bad', badSaveXSSValue)

// Good implementation - uses parameterized queries
async function goodSaveXSSValue(request: Request, response: Response, next: NextFunction) {
  try {
    const { value } = request.body

    // Validate input before processing
    const validation = validateStringInput(value, 'value')
    if (!validation.valid) {
      return response.status(400).json({
        success: false,
        message: validation.error
      })
    }

    const id = 'user-input' // Simple ID for this demo, that way each value is just replacing the old
    const result = await pool.query(
      'SELECT * FROM save_xss_value($1, $2)',
      [id, validation.value]
    )
    
    if (result.rows.length === 0) {
      return response.status(500).json({
        success: false,
        message: 'Failed to save XSS value'
      })
    }
    
    response.json({
      success: true,
      data: {
        id: result.rows[0].result_id,
        value: result.rows[0].result_value
      }
    })
  } catch (error) {
    console.error('Error saving xss value:', error)
    response.status(500).json({
      success: false,
      message: 'Failed to save xss value'
    })
  }
}

async function goodGetXSSValue(request: Request, response: Response, next: NextFunction) {
  try {
    const { id } = request.params
    
    const result = await pool.query(
      'SELECT * FROM get_xss_value($1)',
      [id]
    )
    
    if (result.rows.length === 0) {
      return response.status(404).json({
        success: false,
        message: 'XSS value not found'
      })
    }
    
    response.json({
      success: true,
      data: {
        id: result.rows[0].result_id,
        value: result.rows[0].result_value
      }
    })
  } catch (error) {
    console.error('Error fetching xss value:', error)
    response.status(500).json({
      success: false,
      message: 'Failed to get xss value'
    })
  }
}

export default router
