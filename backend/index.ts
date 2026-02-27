import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { pool, closePool } from './config/database'
//import { notFoundHandler, errorHandler } from './middleware/errorHandler'
//import goodFileUploadEndpoints from './endpoints/goodFileUpload'
//import badFileUploadEndpoints from './endpoints/badFileUpload'
import vulnerabilitiesEndpoints from './endpoints/vulnerabilities'
import xssEndpoints from './endpoints/xss'
import sqlEndpoints from './endpoints/sql'

// Load environment variables
dotenv.config()

// App Configuration
const app: Express = express()
const port = process.env.PORT

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}))

// Body parsing
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Cookie parsing
app.use(cookieParser())

// Health check endpoints
app.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Network Security Project API is running',
    version: '1.0.0'
  })
})

// API routes, this is an example of how they will be used
//app.use('/api', badFileUploadEndpoints)
//app.use('/api', goodFileUploadEndpoints)
app.use('/api', vulnerabilitiesEndpoints)
app.use('/api', xssEndpoints)
app.use('/api', sqlEndpoints)

// Server Startup
const server = app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})

// Graceful Shutdown
async function shutdown(): Promise<void> {
  console.log('\n[server]: Shutting down gracefully...')
  
  server.close(async () => {
    console.log('[server]: HTTP server closed')
    await closePool()
    process.exit(0)
  })
  
  // Force close after 10 seconds
  setTimeout(() => {
    console.error('[server]: Forced shutdown after timeout')
    process.exit(1)
  }, 10000)
}

process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)