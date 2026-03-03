// Good endpoint for uploading files
import { Router, Request, Response, NextFunction } from 'express'
import { pool } from '../config/database'

import { badValidateFileInput } from '../utils/validation'

const router = Router()

// Good implementation routes (secure)
// router.get('/xss/good/:id', goodGetXSSValue)
// router.post('/xss/good', goodSaveXSSValue)

// Bad implementation routes
router.get('/unrestrictedFileUpload/bad/:id', badCheckFileUpload())
router.post('/unrestrictedFileUpload/bad', badFileUpload())

async function badCheckFileUpload(request: Request, response: Response, next: NextFunction, fileInput: File) {
  try {
    if (!badValidateFileInput(fileInput)) {


    }
  }
}