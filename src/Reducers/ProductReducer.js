import {ALL_PRODUCT_FAIL, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_REQUEST, CLEAR_ERRORS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_REQUEST, ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART, CLEAR_CART_STATE} from '../Constants/ProductConstants'

export const ProductReducer = (state = {products:[]}, action) => {
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
            return {
                loading:true,
                products:[]
            };
        case ALL_PRODUCT_SUCCESS:
            return {
                loading:false,
                products:action.payload,
            };
        case ALL_PRODUCT_FAIL:
            return {
                loading:false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            };
    
        default:
            return state;
    }
};

export const ProductDetailsReducer = (state = {product:{}}, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading:true,
                product:null
            };
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading:false,
                product:action.payload,
            };
        case PRODUCT_DETAILS_FAIL:
            return {
                loading:false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            };
    
        default:
            return state;
    }
};

const initialState = {
    products: JSON.parse(sessionStorage.getItem('cart')) || []
};

export const CartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:

                const { productID, productName,description, price, quantity } = action.payload;
                
                const existingItemIndex = state.products.findIndex(item => item.productID === productID);
                
                if (existingItemIndex !== -1) {
                    const updatedItems = [...state.products];
                    updatedItems[existingItemIndex].quantity += quantity;
                    saveCart(updatedItems); 
                    return {
                        ...state,
                        products: updatedItems
                    };
                } else {
                    const newItems = [...state.products, { productID, description, productName, price, quantity }];
                    saveCart(newItems); 
                    return {
                        ...state,
                        products: newItems
                    };
                }
                case UPDATE_CART:
                    const { productID: updateProductID, quantity: updateQuantity } = action.payload;
                    const updateProductIndex = state.products.findIndex(item => item.productID === updateProductID);
                    if (updateProductIndex !== -1) {
                        const updatedCartItems = [...state.products];
                        updatedCartItems[updateProductIndex].quantity = updateQuantity;
                        saveCart(updatedCartItems);
                        return {
                            ...state,
                            products: updatedCartItems
                        };
                    }
                    return state;
                    
                    case REMOVE_FROM_CART:
                        const id = action.payload;
                        const updatedItems = state.products.filter(item => item.productID !== id)
                        saveCart(updatedItems); 
                        
                        return {
                            ...state,
                            products: updatedItems
                        };
                        
                        case CLEAR_ERRORS:
                            return {
                                ...state,
                                error:null
                            };
                            case CLEAR_CART_STATE:
                                return {
                                    ...state,
                                    products:[]
                                };
                                
                                default:
                                    return state;
                                }
                            };
const saveCart = (cartItems) => {
    sessionStorage.setItem('cart', JSON.stringify(cartItems));
};