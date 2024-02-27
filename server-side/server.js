import express, {static as static_} from 'express'
import cors from 'cors'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import routes from './routes.js'

const app = express()

// API Middleware
app.use(cors())
app.use(express.json())
app.use('/api', routes)

// Serve static files
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
app.use(static_(join(__dirname, '../client-side/build')))

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

    