// Good endpoint for uploading files
import { Router, Request, Response, NextFunction } from 'express'
import { pool } from '../config/database'
import multer from 'multer'

import { validateFileInput } from '../utils/validation'

const upload = multer({ storage: multer.memoryStorage() })

const router = Router()

// Good implementation routes (secure)
router.get('/ufu/good/:id', goodGetFileCheck)
router.post('/ufu/good', upload.single('file'), goodFileUploadCheck)

// Bad implementation routes
router.get('/ufu/bad/:id', badGetFileCheck)
router.post('/ufu/bad', upload.single('file'), badFileUploadCheck)

async function badFileUploadCheck(request: Request, response: Response, next: NextFunction) {
  try {
    const file = request.file

    const id = 'user-input' // Simple ID for this demo, that way each value is just replacing the old
    const result = await pool.query(
      'SELECT * FROM save_ufu_value($1, $2, $3)',
      [id, file?.originalname, file?.buffer]
    )

    if (result.rows.length === 0) {
      return response.status(500).json({
        success: false,
        message: 'Failed to save UFU value'
      })
    }

    response.json({
      success: true,
      data: {
        id: result.rows[0].result_id,
        value: result.rows[0].result_filename
      }
    })
  } catch (error) {
    console.error('Error uploading file:', error)
    response.status(500).json({
      success: false,
      message: 'Failed to upload file'
    })
  }
}

// Good implementation - enforces PDF only and uses validation
async function goodFileUploadCheck(request: Request, response: Response, next: NextFunction) {
  try {
    const file = request.file
    if (!file) {
      return response.status(400).json({ success: false, message: 'No file provided' })
    }

    const validation = validateFileInput(file as any)
    if (!validation.valid) {
      return response.status(400).json({ success: false, message: validation.error })
    }

    const id = 'user-input'
    const result = await pool.query(
      'SELECT * FROM save_ufu_value($1, $2, $3)',
      [id, file.originalname, file.buffer]
    )

    if (result.rows.length === 0) {
      return response.status(500).json({
        success: false,
        message: 'Failed to save UFU value'
      })
    }

    response.json({
      success: true,
      data: {
        id: result.rows[0].result_id,
        value: result.rows[0].result_filename
      }
    })
  } catch (error) {
    console.error('Error uploading file (good):', error)
    response.status(500).json({
      success: false,
      message: 'Failed to upload file'
    })
  }
}

// Good getter to fetch PDF/download
async function goodGetFileCheck(request: Request, response: Response, next: NextFunction) {
  try {
    const { id } = request.params
    const result = await pool.query(
      'SELECT id, filename, filedata FROM ufuvalues WHERE id = $1',
      [id]
    )

    if (result.rows.length === 0) {
      return response.status(404).json({
        success: false,
        message: 'File not found'
      })
    }

    const row = result.rows[0]
    response.setHeader('Content-Disposition', `attachment; filename="${row.filename}"`)
    response.setHeader('Content-Type', 'application/octet-stream')
    response.send(row.filedata)
  } catch (error) {
    console.error('Error fetching file (good):', error)
    response.status(500).json({
      success: false,
      message: 'Failed to retrieve file'
    })
  }
}

// Bad GET implementation - vulnerable to SQL injection and returns raw file bytes
async function badGetFileCheck(request: Request, response: Response, next: NextFunction) {
  try {
    const { id } = request.params

    // WARNING: this query concatenates user input directly and is intentionally insecure
    const query = `SELECT id, filename, filedata FROM ufuvalues WHERE id = '${id}'`
    const result = await pool.query(query)

    if (result.rows.length === 0) {
      return response.status(404).json({
        success: false,
        message: 'File not found'
      })
    }

    const row = result.rows[0]
    // set headers so the browser will treat response as a download
    response.setHeader('Content-Disposition', `attachment; filename="${row.filename}"`)
    response.setHeader('Content-Type', 'application/octet-stream')
    response.send(row.filedata)
  } catch (error) {
    console.error('Error fetching file:', error)
    response.status(500).json({
      success: false,
      message: 'Failed to retrieve file'
    })
  }
}


export default router