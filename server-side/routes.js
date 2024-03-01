import { Router } from 'express';
import { load } from 'cheerio';
import axios from 'axios';
import dotenv from 'dotenv';
import puppeteer from 'puppeteer';

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

async function puppeteerScrapeWebsite(url) {
    // Launch a headless Chromium browser
    const browser = await puppeteer.launch();
  
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


const OPEN_AI_KEY =  process.env.KEYWORD_CLUTCH_OPEN_API_KEY
routes.get('/openai-gpt3', async (req, res) => {

})

export default routes;