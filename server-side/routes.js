import { Router } from 'express';
import { load } from 'cheerio';
import axios from 'axios';
import dotenv from 'dotenv';
import puppeteer from 'puppeteer';
import OpenAI from 'openai';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

dotenv.config()
const routes = Router();

const axiosInstance = axios.create({
    timeout: 15000 // 15 seconds
})

const RAPID_API_KEY = process.env.RAPID_API_KEY

// Use Rapid APIs to get keyword data
routes.get('/keyword', async (req, res) => {
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
        const response = await axiosInstance.request(options)
        res.json(response.data).status(200)
    } catch (error) {
        res.send('Error fetching keyword data').status(500)
        console.error(error)
    }
})

routes.get('/youtube-keyword', async (req, res) => {
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
        const response = await axiosInstance.request(options)
        res.json(response.data).status(200)
    } catch (error) {
        res.send('Error fetching keyword data').status(500)
        console.error(error)
    }
})

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
async function puppeteerScrapeWebsite(url) {
    // Launch a headless Chromium browser
    const browser = await puppeteer.launch({
        headless: true,
        executablePath: process.env.CHROME_BIN || null,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
  
    // Open a new page
    const page = await browser.newPage();
  
    try {
        // Navigate to the specified URL
        await page.goto(url);
            // Get the HTML content of the page
            const htmlContent = await page.content();
            // Return the HTML content
            return htmlContent;
        } catch (error) {
            console.error('Error scraping website:', error);
            return null;
        } finally {
        // Close the browser
        await browser.close();
    }
}

routes.get('/weburl', async (req, res) => {
    const { websiteUrl } = req.query
    // Scrape the web URL with Puppeteer
    const rawHtml = await puppeteerScrapeWebsite(websiteUrl)
    
    // Use Cheerio to get keywords
    if (!rawHtml) {
        res.status(400).send('Unable to scrape website: HTML not returned, likely due to bad input')
        return
    }
    const $ = load(rawHtml)
    // Extract text content from paragraphs, headings, and other content-rich elements
    const textContent = $('p, h1, h2, h3, h4, h5, h6').map((index, element) => {
        return $(element).text().trim()
    }).get().join(' ') // Join all text content into a single string
    res.status(200).send(textContent)
})

async function chatGPTAPIText(text, keywords) {
    // API endpoint for GPT-3.5-turbo-0125
    const prompt = `Rewrite the following text to optimize it for SEO and rank for the given keywords. The optimized text should be no more than 1.5x the length of the text passed in. Make sure to end the text on a complete sentence, do not exceed 700 words. "Text: ${text}". Keywords: ${keywords}}.`

    /* gpt-3.5-turbo-0613 */
    // Make the HTTP POST request to the OpenAI API
    const completion = await openAIClient.chat.completions.create({
        messages: [
            { role: "user", content: prompt },
        ],
        model: "gpt-3.5-turbo-0613",
        max_tokens: 700,
        temperature: 0.8,
    })
    // Parse and return response
    return completion
}

routes.get('/text', async (req, res) => {
    const { text, keywords } = req.query
    // Use the OpenAI GPT-3 API to optimize the text for SEO
    const response = await chatGPTAPIText(text, keywords)
    res.send(response.choices[0].message.content).status(200)
})

const OPEN_AI_KEY =  process.env.KEYWORD_CLUTCH_OPEN_API_KEY
const openAIClient = new OpenAI({baseURL: 'https://api.openai.com/v1', apiKey: OPEN_AI_KEY, organization: null})

async function chatGPTAPIWebUrl(websiteText, optimizedKeywords) {
    // API endpoint for GPT-3.5-turbo-0125
    const prompt = `Optimize the following website text for SEO, limit the response to 700 words. Use the delimiter "*del*" to separate sections of the website in the returned string.
    Make sure each section ends on a complete sentence. "Website text: ${websiteText}". Keywords: ${optimizedKeywords}}.`

    /* gpt-3.5-turbo-0613 */
    // Make the HTTP POST request to the OpenAI API
    const completion = await openAIClient.chat.completions.create({
        messages: [
            { role: "user", content: prompt },
        ],
        model: "gpt-3.5-turbo-0613",
        max_tokens: 700,
        temperature: 0.8,
    })
    // Parse and return response
    return completion
}

routes.post('/openai-gpt3', async (req, res) => {
    const { websiteText, optimizedKeywords } = req.body
    const response = await chatGPTAPIWebUrl(websiteText, optimizedKeywords)
    console.log(JSON.stringify(response))
    res.send(response.choices[0].message.content).status(200)
})

export default routes;