import { join } from 'path';

// Define the Puppeteer configuration object
const puppeteerConfiguration = {
    // Changes the cache location for Puppeteer.
    cacheDirectory: join(__dirname, '.cache', 'puppeteer')
};

// Export the Puppeteer configuration object
module.exports = puppeteerConfiguration;