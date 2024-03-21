import express, {static as static_} from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import dataRoutes from './routes.js'
import stripeRoutes from './stripe.js'


const app = express()

// API Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(express.json())
app.use('/api/data', dataRoutes)
app.use('/api/stripe', stripeRoutes)

// Serve static files
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
app.use(static_(join(__dirname, '../client-side/build')))

// Define route handler for all routes that don't match a specific API endpoint
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client-side/build', 'index.html'));
});

const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

    