
const initialState = {
    products: [],
    productIds: [],
    isError: false,
};
function cartReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_CARTITEMS": {
            return {
                ...state,
                products: action.payload
            };
        }
        case "ADD_TO_CART": {
            var itemToAdd = Object.assign({}, action.payload);
            if (state.productIds.indexOf(itemToAdd.pId) < 0) {
                itemToAdd["isAdded"] = true;
                itemToAdd["productCount"] = 1;
                itemToAdd["totalPrice"] = itemToAdd.price;
                itemToAdd["totalQuantity"] = itemToAdd.quantity;
                itemToAdd["discountPrice"] = getDiscountPrice(itemToAdd.price,itemToAdd.offerPercentage,1);
                return {
                    ...state,
                    products: [...state.products, itemToAdd],
                    productIds: [...state.productIds, itemToAdd.pId]
                };
            } else {
                return {
                    ...state,
                    isError: true
                };
            }
        }
        case "REMOVE_FROM_CART": {
            var currProduct = Object.assign({}, action.payload);
            var cartProducts = [...state.products];
            var updatedProductList = cartProducts.filter(function(rec){
                if(rec.pId !== currProduct.pId)
                  return rec;
            });
            var cartProdId = [...state.productIds];
            var ind = cartProdId.indexOf(currProduct.pId);
            cartProdId.splice(ind,1);
            return{
                ...state,
                products: updatedProductList,
                productIds: cartProdId
            }

        }
        case "CART_ERROR": {
            return {
                ...state,
                isError: true
            };
        }
        case "INCREASE_QUANTITY": {
            var currProduct = Object.assign({}, action.payload);
            if (state.productIds.indexOf(currProduct.pId) >= 0) {
                var finalProdList = [];
                for(var i=0;i<state.products.length;i++){
                    var rec =  Object.assign({},state.products[i]);
                    if(state.products[i].pId ===currProduct.pId ){
                        rec.productCount = rec.productCount + 1;
                        rec.totalPrice = rec.productCount * rec.price;
                        rec.totalQuantity = getToatalQuantity(rec.quantity, rec.productCount);  
                        rec.discountPrice = getDiscountPrice(rec.price,rec.offerPercentage, rec.productCount);
                    }
                    finalProdList.push(rec);
                }
                return {
                    ...state,
                    products: finalProdList
                };
            } else {
                return {
                    ...state,
                    isError: true
                };
            }

        }
        case "DECREASE_QUANTITY": {
            var currProduct = Object.assign({}, action.payload);
            if (state.productIds.indexOf(currProduct.pId) >= 0) {
                var finalProdList = [];
                for (var i = 0; i < state.products.length; i++) {
                    var rec = Object.assign({}, state.products[i]);
                    if (state.products[i].pId === currProduct.pId) {
                        rec.productCount = (rec.productCount > 1) ? rec.productCount - 1 : 1;
                        rec.totalPrice = rec.productCount * rec.price;
                        rec.totalQuantity = getToatalQuantity(rec.quantity, rec.productCount);
                        rec.discountPrice = getDiscountPrice(rec.price, rec.offerPercentage, rec.productCount);
                    }
                    finalProdList.push(rec);
                }
                return {
                    ...state,
                    products: finalProdList
                };
            } else {
                return {
                    ...state,
                    isError: true
                };
            }
        }
        default:
            return state;
    }
}

function getToatalQuantity(initialQuant, productCount) {
    var quantityArr = initialQuant.split(" ");
    var totalQuant = parseInt(quantityArr[0], 10) * productCount;
    return (totalQuant + " " + quantityArr[1]);
}
function getDiscountPrice(actualPrice, discount, productCount) {
    var discountAmount = (actualPrice/100 ) * discount;
    var finalAmount = discount !== 0 ? ((actualPrice-discountAmount) * productCount) : 0;
    return finalAmount;
}
export default cartReducer;