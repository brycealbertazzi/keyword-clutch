import axios from 'axios';

class RankRocketAPIUtils {

    // Function to fetch search results from SerpApi
    static async fetchGoogleSerpResults(query) {
        const serpApiKey = process.env.REACT_APP_SERP_API_KEY; // Replace with your SerpApi API key
        const apiUrl = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&api_key=${serpApiKey}`;
    
        try {
            const response = await axios.get(apiUrl);
            return response.data;
        } catch (error) {
            console.error('Error fetching search results:', error.message);
            return null;
        }
    }
}

export default RankRocketAPIUtils;