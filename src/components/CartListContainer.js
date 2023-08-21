
import ListItem from './ListItem';
import './App.css';


function CartListContainer(props){
    var allProductComp;
    const cartItems = props.productsList || [];
    if (cartItems.length > 0) {
        allProductComp = cartItems.map(function (product) {
            var productDetails = product;
            return (
                <ListItem key ={productDetails.pId} 
                          itemDetails={productDetails} 
                          isAdded = {true}
                          isCartScreen = {true}
                          quantity = {productDetails.quantity ?productDetails.quantity :1}
                />
            )
            
        });
        return(
            <div className = "cart-listcont flex-col">
                {allProductComp}
            </div>
        )
    } else{
        return (
            <div className="flex-row cart-listcont">
                <div className="flex-col empty-cart">
                    <label>No products available in cart.</label>
                    <label>Please add products to cart.</label>
                </div>

            </div>
        )
    }
    
}

export default CartListContainer;


