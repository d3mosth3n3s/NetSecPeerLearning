import Pool from 'pg'
import dotenv from 'dotenv'

dotenv.config()

export const pool = new Pool.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

pool.on('error', (err) => {
  console.error('Unexpected database pool error:', err)
})

export async function closePool(): Promise<void> {
  await pool.end()
  console.log('Database pool closed')
}
