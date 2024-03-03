const reducer = (state, action) => {
    switch (action.type) {
        case 'OPTIMIZED_TEXT':
            return {
                ...state,
                optimizedText: action.payload
            }
        case 'TMP_HIDE_FOOTER':
            return {
                ...state,
                tmpHideFooter: action.payload
            }
        case 'WEBSITE_SEO_STEP':
            return {
                ...state,
                websiteSEOStep: action.payload
            }
        default:
        return state
    }
}

export default reducer