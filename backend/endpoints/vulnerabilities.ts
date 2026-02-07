import { Router, Request, Response, NextFunction } from 'express'
import { pool } from '../config/database'

const router = Router()

router.get('/vulnerabilities', getVulnerabilities)
router.get('/vulnerability/:id', getVulnerabilityById)

async function getVulnerabilities(request: Request, response: Response, next: NextFunction) {
  try {
    const result = await pool.query('SELECT * FROM get_all_vulnerabilities()')
    response.json({
      success: true,
      data: result.rows
    })
  } catch (error) {
    console.error('Error fetching vulnerabilities:', error)
    response.status(500).json({
      success: false,
      message: 'Failed to fetch vulnerabilities'
    })
  }
}

async function getVulnerabilityById(request: Request, response: Response, next: NextFunction) {
  try {
    const { id } = request.params
    const result = await pool.query('SELECT * FROM get_vulnerability_by_id($1)', [id])
    
    if (result.rows.length === 0) {
      return response.status(404).json({
        success: false,
        message: 'Vulnerability not found'
      })
    }
    
    response.json({
      success: true,
      data: result.rows[0]
    })
  } catch (error) {
    console.error('Error fetching vulnerability:', error)
    response.status(500).json({
      success: false,
      message: 'Failed to fetch vulnerability'
    })
  }
}

export default router
