export const getCartItems=()=>{
    return{
        type:"GET_CARTITEMS"
    }
}
export const addProductToCart=(product) =>{
    return {
        type: "ADD_TO_CART",
        payload: product
    }
};
export const removeProductFromCart=(product) =>{
    return {
        type: "REMOVE_FROM_CART",
        payload: product
    }
};

export const  cartError=()=>{
    return {
        type:"CART_ERROR"
    }
}

export const increaseQuantity=(product) =>{
    return {
        type: "INCREASE_QUANTITY",
        payload: product
    }
};
export const decreaseQuantity=(product) =>{
    return {
        type: "DECREASE_QUANTITY",
        payload: product
    }
};
