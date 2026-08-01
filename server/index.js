import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

// Example API endpoint
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from server' })
})

const PORT = process.env.PORT || 8787
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
