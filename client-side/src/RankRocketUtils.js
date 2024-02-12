import axios from 'axios'

class RankRocketUtils {
  static async fetchApiKey(resourceName) {
    const PORT = process.env.PORT || 3001
    const response = await axios.get(`http://localhost:${PORT}/api/secret?secretName=${resourceName}`)
    if (response.status === 200) {
      return response.data.secret
    } else {
      console.error('Error fetching secret:', response.data.error)
      return null
    }
  }

  // Fetch other API keys here
  static ScrapingBeeKey = this.fetchApiKey(process.env.REACT_APP_SCRAPING_BEE_API_RESOURCE_NAME)

  static ApifyKey = this.fetchApiKey(process.env.REACT_APP_APIFY_API_KEY_RESOURCE_NAME)
}

export default RankRocketUtils