export const NavbarTitles = {
    LANDING_PAGE: 'WELCOME TO KEYWORD CLUTCH',
    HOME_PAGE: 'KEYWORD CLUTCH',
    ACCOUNT_PAGE: 'MANAGE ACCOUNT',
    PRICING: 'PRICING'
}

export const ResultType = {
    GOOGLE: 'google',
    YOUTUBE: 'youtube',
    WEB_URL: 'web_url'
}

export const InputType = {
    KEYWORD: 'keyword',
    URL: 'url'
}

export const ResultTypeColors = {
    [ResultType.GOOGLE]: '#4285F4',
    [ResultType.YOUTUBE]: '#f44242',
    [ResultType.WEB_URL]: '#ad9f2f'
}

export const SubscriptionTypes = {
    TRIALING: 'trialing',
    ACTIVE: 'active'
}

export const SubscriptionTypeLabels = {
    [SubscriptionTypes.TRIALING]: 'Free Trial',
    [SubscriptionTypes.ACTIVE]: 'Active Subscription',
}

const StopWords = {
    'A': ['able', 'about', 'above', 'abroad', 'accordance', 'according', 'accordingly', 'across', 'actually', 'added', 'adopted', 'affected', 'affecting', 'affects', 'after', 'afterwards', 'against', 'ahead', 'allow', 'allows', 'almost', 'alone', 'along', 'already', 'also', 'although', 'always', 'amid', 'amidst', 'among', 'amongst', 'another', 'anybody', 'anyhow', 'anymore', 'anything', 'anyway', 'anyways', 'apart', 'apparently', 'appear', 'appreciate', 'appropriate', 'approximately', 'around', 'asking', 'associated', 'away', 'awfully'],
    'B': ['became', 'bring', 'bringing', 'because', 'become', 'becomes', 'becoming', 'before', 'begin', 'begins', 'behind', 'being', 'believe', 'below', 'beside', 'besides', 'between', 'both'],
    'C': ['came', 'cannot', 'caption', 'cause', 'causes', 'certain', 'certainly', 'concerning', 'consequently', 'consider', 'considering', 'contain', 'containing', 'contains', 'currently'],
    'D': ['definitely', 'describe', 'described', 'despite', 'detail', 'different', 'directly', 'doesnt', 'doing', 'dont', 'down', 'downwards', 'during'],
    'E': ['each', 'either', 'elsewhere', 'enough', 'entirely', 'especially', 'even', 'every', 'everybody', 'everyone', 'everything', 'everywhere', 'except'],
    'F': ['from', 'farther', 'fewer', 'former', 'formerly', 'forth', 'further', 'furthermore'],
    'G': ['getting', 'given', 'gives', 'goes', 'gone', 'gotten'],
    'H': ['happens', 'here', 'hardly', 'hasnt', 'having', 'help', 'hence', 'hereafter', 'hereby', 'herein', 'hereupon', 'herself', 'hes', 'himself','hither', 'hopefully', 'howbeit', 'however', 'have', 'hed', 'heres', 'hers', 'herself', 'himself', 'hows', 'had', 'hadnt', 'has', 'hasnt', 'havent'],
    'I': ['immediate', 'includes', 'include', 'important', 'inasmuch', 'indeed', 'index', 'indicate', 'indicated', 'indicates', 'inner', 'insofar', 'instead', 'interest', 'inward', 'itself', 'i', 'ive'],
    'J': ['just', 'join'],
    'K': ['keeps', 'kept'],
    'L': ['largely', 'later', 'latter', 'latterly', 'least', 'less', 'lets', 'like', 'liked', 'likely', 'likewise', 'look', 'looking', 'looks'],
    'M': ['mainly', 'most', 'make', 'makes', 'maybe', 'meanwhile', 'merely', 'mine', 'minus', 'miss', 'more', 'moreover', 'mostly', 'move', 'much', 'must', 'myself'],
    'N': ['name', 'never', 'namely', 'near', 'nearly', 'necessary', 'need', 'needs', 'neither', 'nevertheless', 'nor', 'normally', 'noted', 'nothing', 'nowhere'],
    'O': ['other', 'over', 'obviously', 'often', 'once', 'ones', 'onto', 'otherwise', 'ought', 'ourselves'],
    'P': ['part', 'particularly', 'past', 'perhaps', 'placed', 'please', 'plus', 'possible', 'potentially', 'predominantly', 'presumably', 'previously', 'primarily', 'promptly', 'proud', 'provided', 'provides'],
    'Q': ['quite'],
    'R': ['rather', 'readily', 'reasonably', 'recent', 'recently', 'regarding', 'regardless', 'related', 'relatively', 'research', 'respectively', 'resulted', 'resulting', 'results', 'right', 'round'],
    'S': ['said', 'such', 'same', 'secondly', 'some', 'seen', 'several', 'shall', 'shes', 'should', 'shouldnt', 'showed', 'shown', 'shows', 'side', 'similar', 'similarly', 'since', 'slightly', 'somewhere', 'sorry', 'specifically', 'specified', 'specify', 'specifying', 'still', 'strongly', 'substantially', 'successfully', 'sufficiently', 'suggest', 'sure'],
    'T': ['taken', 'than', 'that', 'taking', 'they', 'tell', 'tends', 'thence', 'thereafter', 'this', 'thereby', 'therefore', 'therein', 'thereof', 'thereupon', 'thing', 'things', 'think', 'thorough', 'thoroughly', 'though', 'through', 'throughout', 'thru', 'thus', 'till', 'tip', 'together', 'took', 'toward', 'towards', 'tried', 'tries', 'truly', 'trying', 'their'],
    'U': ['unfortunately', 'using', 'unless', 'unlike', 'unlikely', 'until', 'upon', 'upwards', 'useful', 'usefully', 'usefulness', 'usually'],
    'V': ['various', 'versus', 'via', 'very'],
    'W': ['wants', 'weve', 'when', 'wasnt', 'what', 'welcome', 'were', 'with', 'went', 'will', 'werent', 'whatever', 'whats', 'whereafter', 'whereas', 'whereby', 'wherein', 'wheres', 'wherever', 'whether', 'whichever', 'whilst', 'whither', 'whole', 'whom', 'whos', 'whose', 'widely', 'willing', 'without'],
    'X': [],
    'Y': ['yes', 'youre', 'youve', 'your'],
    'Z': [],
}

function isFirstCharLetter(str) {
    // Convert the first character to its ASCII code
    const charCode = str.charCodeAt(0)
    
    // Check if the ASCII code falls within the range of lowercase or uppercase letters
    return (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)
}

const NUM_DISPLAY_KEYWORDS = 95
export function extractKeywords(text) {
    // Convert text to lowercase to make the algorithm case-insensitive
    text = text.toLowerCase()
    
    // Split the text into words
    const words = text.split(/\s+/)
    
    // Define an object to store the frequency of each keyword
    const keywordFreq = {}
    
    // Iterate over each word in the text
    words.forEach(word => {
        // Remove punctuation characters
        word = word.replace(/[^a-zA-Z]/g, "")
        // Ignore stopwords and short words (length less than 3)
        if (isFirstCharLetter(word)) {
            const startLetter = word.charAt(0).toUpperCase()
            if (!StopWords[startLetter].includes(word) && word.length > 3) {
                // Increment the frequency count of the current keyword
                keywordFreq[word] = (keywordFreq[word] || 0) + 1
            }
        }
    })
    
    // Convert the keyword frequency object to an array of objects
    const keywordList = Object.keys(keywordFreq).map(keyword => ({ keyword, frequency: keywordFreq[keyword] }))
    
    // Sort the keywords by frequency in descending order
    keywordList.sort((a, b) => b.frequency - a.frequency)
    
    return keywordList.slice(0, NUM_DISPLAY_KEYWORDS).map(item => item.keyword)
}

export const convertUnixTimestampToDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US')
}