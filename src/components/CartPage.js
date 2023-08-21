import CartListContainer from "./CartListContainer";
import CartPurchaseTotal from './CartPurchaseTotal';
import {connect} from 'react-redux';
import "../styles/CartPage.css";

function CartPage(props){
 return (
     <div className = "flex-row cart-page">
         <CartListContainer productsList = {props.addedProducts}/>
         <CartPurchaseTotal  productsList = {props.addedProducts}/>
     </div>
     
 )
}
const mapStateToProps = state => {
    return{
        addedProducts: state.cart.products
    }
};

export default connect (mapStateToProps,null)(CartPage);