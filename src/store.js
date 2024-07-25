import {createStore, combineReducers, applyMiddleware} from "redux"
import {thunk} from 'redux-thunk'
import { composeWithDevTools} from 'redux-devtools-extension'
import { CartReducer, CheckInventoryReducer, IsAvailableReducer, ProductDetailsReducer, ProductReducer, SearchProductReducer } from "./Reducers/ProductReducer";
import { AllUsersReducer, UserByIdReducer, UserOrdersReducer, UserReducer } from "./Reducers/UserReducer";
import { AllOrderReducer, OrderByIdReducer } from "./Reducers/OrderReducer";

const reducer = combineReducers({
    products: ProductReducer,
    productDetails: ProductDetailsReducer,
    currentUser: UserReducer,
    cart:CartReducer,
    userOrders:UserOrdersReducer,
    orderById: OrderByIdReducer,
    userById: UserByIdReducer,
    allOrders: AllOrderReducer,
    outOfStock: CheckInventoryReducer,
    allUsers: AllUsersReducer,
    IsAvailable: IsAvailableReducer,
    search: SearchProductReducer
})

let initialState = {};

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;