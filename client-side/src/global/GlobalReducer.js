const reducer = (state, action) => {
    switch (action.type) {
        case 'WEB_URL_OPTIMIZED_TEXT':
            return {
                ...state,
                webUrlOptimizedText: action.payload
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
        case 'STRIPE_CUSTOMER':
            return {
                ...state,
                stripeCustomer: action.payload
            }
        case 'POP_UP_MODAL_DATA':
            return {
                ...state,
                popUpModalData: action.payload
            }
        default:
        return state
    }
}

export default reducer