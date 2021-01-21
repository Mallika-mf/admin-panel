 let item = localStorage.getItem('cart');
            
// const initState = JSON.parse(item);
const initState = {
    userCart : JSON.parse(item)
}
const cartReducer = (state = initState, action) => {
    switch(action.type){
        case 'CREATE_CART':      
            return {
                ...state,
                successMessage : true
            };
        case 'UPDATE_USER_CART':      
            return {
                ...state,
                //userCart: {...state.userCart, action.payload.item}
        };
        case 'CREATE_CART_ERROR':
        return {
            ...state,
            successMessage: false
        }
        default:
        return state;
    }
}
export default cartReducer