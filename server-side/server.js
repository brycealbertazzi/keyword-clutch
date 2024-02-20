import express, {static as static_} from 'express'
import cors from 'cors'
import axios from 'axios'
import { load } from 'cheerio'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const PORT = process.env.PORT || 3001

const app = express()

app.use(cors())
app.use(express.json())

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
app.use(static_(join(__dirname, '../client-side/public')))

const RAPID_API_KEY = '462b41c4bcmshef496140a2f7292p1a09dcjsna243ae0d12fb'

// Use Rapid APIs to get keyword data
app.get('/api/keyword', async (req, res) => {
    const { keyword } = req.query
    const options = {
        method: 'GET',
        url: 'https://keysuggest-keyword-data.p.rapidapi.com/get_keyword_data',
        params: {
            keyword,
            related_kw: '25'
        },
        headers: {
            'X-RapidAPI-Key': RAPID_API_KEY,
            'X-RapidAPI-Host': 'keysuggest-keyword-data.p.rapidapi.com'
        }
    }
    try {
        const response = await axios.request(options)
        res.json(response.data).status(200)
    } catch (error) {
        res.send('Error fetching keyword data').status(500)
        console.error(error)
    }
})

app.get('/api/youtube-keyword', async (req, res) => {
    const { keyword } = req.query
    const options = {
        method: 'GET',
        url: 'https://keyword-research-for-youtube.p.rapidapi.com/yttags.php',
        params: {
            keyword,
        },
        headers: {
            'X-RapidAPI-Key': RAPID_API_KEY,
            'X-RapidAPI-Host': 'keyword-research-for-youtube.p.rapidapi.com'
        }
    }
    try {
        const response = await axios.request(options)
        res.json(response.data).status(200)
    } catch (error) {
        res.send('Error fetching keyword data').status(500)
        console.error(error)
    }
})

const SCRAPING_BEE_API_KEY = 'VJCE5R3SPXR31PK5AQG150Q0QG1K14IWKCI89KBL7G4DXIPC0N2BAMYYD8EOADM54WRVAJRH8FG5JA9E'

app.get('/api/weburl', async (req, res) => {
    const { websiteUrl } = req.query
    const scrapingBeeRes = await axios.get(`https://app.scrapingbee.com/api/v1?url=${websiteUrl}&json_response=true&api_key=${SCRAPING_BEE_API_KEY}`).then((res) => {
        return res
    }).catch((e) => {
        res.status(e?.response?.status ? e.response.status : 400).send('Error scraping website: ', e?.response?.statusText ? e.response.statusText : '')
        return null
    })
    // Use Cheerio to get keywords
    if (!scrapingBeeRes) {
        res.status(400).send('Unable to scrape website: HTML not returned, likely due to bad input')
        return
    }
    const rawHtml = scrapingBeeRes.data.body
    const $ = load(rawHtml)

    // Extract text content from paragraphs, headings, and other content-rich elements
    const textContent = $('p, h1, h2, h3, h4, h5, h6').map((index, element) => {
        return $(element).text().trim()
    }).get().join(' ') // Join all text content into a single string
    res.status(200).send(textContent)
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

    