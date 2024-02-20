
export const ResultType = {
    GOOGLE: 'google',
    YOUTUBE: 'youtube',
    WEB_URL: 'web_url'
}

export const InputType = {
    KEYWORD: 'keyword',
    URL: 'url'
}

const StopWords = {
    'A': ['able', 'about', 'above', 'abroad', 'abst', 'accordance', 'according', 'accordingly', 'across', 'actually', 'added', 'adopted', 'affected', 'affecting', 'affects', 'after', 'afterwards', 'against', 'ahead', 'allow', 'allows', 'almost', 'alone', 'along', 'already', 'also', 'although', 'always', 'amid', 'amidst', 'among', 'amongst', 'amount', 'announce', 'another', 'anybody', 'anyhow', 'anymore', 'anything', 'anyway', 'anyways', 'apart', 'apparently', 'appear', 'appreciate', 'appropriate', 'approximately', 'around', 'asking', 'associated', 'away', 'awfully'],
    'B': ['back', 'backward', 'backwards', 'became', 'because', 'become', 'becomes', 'becoming', 'before', 'begin', 'beginning', 'begins', 'behind', 'being', 'believe', 'below', 'beside', 'besides', 'better', 'between', 'beyond', 'bill', 'both', 'bottom', 'brief', 'briefly'],
    'C': ['call', 'came', 'cannot', 'caption', 'cause', 'causes', 'certain', 'certainly', 'changes', 'clearly', 'computer', 'concerning', 'consequently', 'consider', 'considering', 'contain', 'containing', 'contains', 'corresponding', 'course', 'current', 'currently'],
    'D': ['daren\'t', 'definitely', 'describe', 'described', 'despite', 'detail', 'different', 'directly', 'doesnt', 'doing', 'don\'t', 'down', 'downwards', 'during'],
    'E': ['each', 'effect', 'eight', 'either', 'eleven', 'elsewhere', 'empty', 'ending', 'enough', 'entirely', 'especially', 'even', 'every', 'everybody', 'everyone', 'everything', 'everywhere', 'except', 'example'],
    'F': ['fairly', 'farther', 'fewer', 'fifth', 'fifty', 'first', 'five', 'followed', 'following', 'follows', 'former', 'formerly', 'forth', 'forty', 'forward', 'found', 'front', 'further', 'furthermore'],
    'G': ['getting', 'given', 'gives', 'giving', 'goes', 'gone', 'gotten', 'greetings'],
    'H': ['happens', 'hardly', 'hasnt', 'having', 'hello', 'help', 'hence', 'hereafter', 'hereby', 'herein', 'hereupon', 'herself', 'hes', 'himself', 'hither', 'hopefully', 'howbeit', 'however', 'hundred', 'have', 'having', 'he\'d', 'he\'ll', 'he\'s', 'here\'s', 'hers', 'herself', 'himself', 'how\'s', 'hows', 'had', 'hadn\'t', 'has', 'hasn\'t', 'haven\'t', 'having', 'he\'d', 'he\'ll', 'he\'s', 'here\'s', 'hers', 'herself', 'himself', 'how\'s', 'hows', 'had', 'hadn\'t', 'has', 'hasn\'t', 'haven\'t', 'having', 'he\'d', 'he\'ll', 'he\'s', 'here\'s', 'hers', 'herself', 'himself', 'how\'s', 'hows', 'had', 'hadn\'t', 'has', 'hasn\'t', 'haven\'t', 'having', 'he\'d', 'he\'ll', 'he\'s', 'here\'s', 'hers', 'herself', 'himself', 'how\'s', 'hows', 'had', 'hadn\'t', 'has', 'hasn\'t', 'haven\'t', 'having', 'he\'d', 'he\'ll', 'he\'s', 'here\'s', 'hers', 'herself', 'himself', 'how\'s', 'hows', 'had', 'hadn\'t', 'has', 'hasn\'t', 'haven\'t', 'having', 'he\'d', 'he\'ll', 'he\'s', 'here\'s', 'hers', 'herself', 'himself', 'how\'s', 'hows', 'had', 'hadn\'t', 'has', 'hasn\'t', 'haven\'t', 'having', 'he\'d', 'he\'ll', 'he\'s', 'here\'s', 'hers', 'herself', 'himself', 'how\'s', 'hows', 'had', 'hadn\'t', 'has', 'hasn\'t', 'haven\'t', 'having', 'he\'d', 'he\'ll', 'he\'s', 'here\'s',],
    'I': ['immediate', 'important', 'inasmuch', 'indeed', 'index', 'indicate', 'indicated', 'indicates', 'information', 'inner', 'insofar', 'instead', 'interest', 'invention', 'inward', 'itself'],
    'J': ['just'],
    'K': ['keeps', 'kept'],
    'L': ['largely', 'later', 'latter', 'latterly', 'least', 'less', 'lets', 'like', 'liked', 'likely', 'likewise', 'little', 'look', 'looking', 'looks'],
    'M': ['mainly', 'make', 'makes', 'maybe', 'meanwhile', 'merely', 'million', 'mine', 'minus', 'miss', 'more', 'moreover', 'mostly', 'move', 'much', 'must', 'myself'],
    'N': ['name', 'namely', 'near', 'nearly', 'necessary', 'need', 'needs', 'neither', 'nevertheless', 'next', 'nine', 'none', 'nor', 'normally', 'noted', 'nothing', 'novel', 'nowhere'],
    'O': ['obtain', 'obtained', 'obviously', 'often', 'omitted', 'once', 'ones', 'onto', 'opposite', 'ordinarily', 'otherwise', 'ought', 'ourselves', 'outside', 'overall'],
    'P': ['page', 'pages', 'part', 'particularly', 'past', 'perhaps', 'placed', 'please', 'plus', 'possible', 'potentially', 'predominantly', 'present', 'presumably', 'previously', 'primarily', 'promptly', 'proud', 'provided', 'provides'],
    'Q': ['quite'],
    'R': ['rather', 'readily', 'reasonably', 'recent', 'recently', 'regarding', 'regardless', 'related', 'relatively', 'research', 'respectively', 'resulted', 'resulting', 'results', 'right', 'round'],
    'S': ['said', 'same', 'second', 'secondly', 'section', 'seen', 'sensible', 'serious', 'seriously', 'several', 'shall', 'shed', 'shell', 'shes', 'should', 'shouldnt', 'showed', 'shown', 'shows', 'side', 'significant', 'similar', 'similarly', 'since', 'sixty', 'slightly', 'somewhere', 'sorry', 'specifically', 'specified', 'specify', 'specifying', 'states', 'still', 'strongly', 'substantially', 'successfully', 'sufficiently', 'suggest', 'sure', 'system'],
    'T': ['taken', 'taking', 'tell', 'tends', 'thence', 'thereafter', 'thereby', 'therefore', 'therein', 'thereof', 'thereupon', 'thick', 'thin', 'thing', 'things', 'think', 'third', 'thirty', 'thorough', 'thoroughly', 'though', 'through', 'throughout', 'thru', 'thus', 'till', 'tip', 'together', 'took', 'toward', 'towards', 'tried', 'tries', 'truly', 'trying', 'their'],
    'U': ['unfortunately', 'unless', 'unlike', 'unlikely', 'until', 'upon', 'upwards', 'useful', 'usefully', 'usefulness', 'usually'],
    'V': ['value', 'various', 'versus', 'via', 'viz', 'vols'],
    'W': ['wants', 'wasnt', 'welcome', 'were', 'with', 'went', 'will', 'werent', 'whatever', 'whats', 'whereafter', 'whereas', 'whereby', 'wherein', 'wheres', 'wherever', 'whether', 'whichever', 'whilst', 'whither', 'whole', 'whom', 'whos', 'whose', 'widely', 'willing', 'without'],
    'X': [],
    'Y': ['yes', 'youre', 'youve'],
    'Z': [],
}

function isFirstCharLetter(str) {
    // Convert the first character to its ASCII code
    const charCode = str.charCodeAt(0)
    
    // Check if the ASCII code falls within the range of lowercase or uppercase letters
    return (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)
}

const NUM_DISPLAY_KEYWORDS = 100
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