// Good endpoint for uploading files
import { Router, Request, Response, NextFunction } from 'express'
import { pool } from '../config/database'
import multer from 'multer'

import { badValidateFileInput } from '../utils/validation'

const upload = multer({ storage: multer.memoryStorage() })

const router = Router()

// Good implementation routes (secure)
// router.get('/ufu/good/:id', goodFileUploadCheck)
// router.post('/ufu/good', goodFileUploadCheck)

// Bad implementation routes
router.get('/ufu/bad/:id', badFileUploadCheck)
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
        value: result.rows[0].filename
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