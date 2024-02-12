import express from 'express'
import cors from 'cors'
import { SecretManagerServiceClient } from '@google-cloud/secret-manager'

const app = express()

app.use(cors())

const client = new SecretManagerServiceClient({
    keyFilename: './server-side/rank-rocket-api.json'
})

app.get('/api/secret', async (req, res) => {
    try {
        const secretName = `${req.query.secretName}/versions/latest`
        const [version] = await client.accessSecretVersion({ name: secretName })
        const secret = version.payload.data.toString('utf8')
        res.json({ secret })
    } catch (error) {
        console.error('Error fetching secret:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})