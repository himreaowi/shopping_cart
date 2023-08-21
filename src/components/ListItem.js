import { AiOutlinePlusSquare, AiOutlineMinusSquare } from 'react-icons/ai';
import { FaCartPlus } from 'react-icons/fa';
import { IoMdPricetag } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { connect } from 'react-redux';
import { addProductToCart, increaseQuantity, decreaseQuantity, removeProductFromCart } from "../actions/cartActions.js";

function ListItem(props) {

    const itemDetails = props.itemDetails;
    var imagePath = "images/" + itemDetails.imgFileName;
    const isProductAdded = props.isAdded === true ? true : false;
    const cardWidth = props.isCartScreen === false ? {"width":"30%"} : {"width":"90%"};
    return (
        <div className="flex-row item-cont" style = {cardWidth}>
            <div className="item-right">
                <img src={imagePath} />
            </div>
            <div className="flex-col item-left">
                {itemDetails.offerPercentage !== 0 && <div className="item-tag">
                    <p>{itemDetails.offerPercentage+"%"}</p>
                    <label>OFF</label>
                </div>}
                <div className="item-details">
                    <h3>{itemDetails.name}</h3> 
                    {priceComponent(itemDetails)}
                </div>
                {isProductAdded === true && qunatityComponent(props)}
                <div className="item-actions">
                    {isProductAdded === true ? RemoveFromCartButton(props) : AddToCartButton(props)}
                </div>

            </div>
        </div>
    );
}




/** Add to cart button component **/
function AddToCartButton(props) {
    const details = props.itemDetails;
    return (<div className="flex-row carticon-cont"
        onClick={() => props.addItemToCart(details)}>
        <FaCartPlus className="cart-icon" />
        <label >ADD</label>
    </div>);
}

/** Remove from cart button component **/
function RemoveFromCartButton(props) {
    const details = props.itemDetails;
    return (<>
        <div className="carticon-cont" onClick = {()=>props.removeItemFromCart(details)}>
            <MdDelete className="remove-icon" />
        </div>
        <div className="flex-row item-price">
            <IoMdPricetag className="price-icon"/>
            <label>{details.offerPercentage !== 0 ? details.discountPrice.toFixed(2) : details.totalPrice.toFixed(2) }</label>
        </div>
    <label>{details.totalQuantity}</label>
    </>)
}

/** product count component  **/
function qunatityComponent(props) {
    const details = props.itemDetails;
    return (
        <div className="flex-row quantity-cont">
            <AiOutlineMinusSquare className="quantity-button" onClick={details.productCount === 1 ? () => { } : () => props.decreaseQuantity(details)} />
            <label className="quantity-input" >{details.productCount ? details.productCount : 1} </label>
            <AiOutlinePlusSquare className="quantity-button" onClick={() => props.increaseQuantity(details)} />
        </div>
    );
}

/** Display actual price, quantity row component **/
function priceComponent(itemDetails) {
    if(itemDetails.offerPercentage !== 0){
        var discountPrice = (itemDetails.price/100) *itemDetails.offerPercentage;
        return (
            <div className="flex-row item-price-qty">
                <label>{itemDetails.quantity}</label>
                <div className="flex-row item-price">
                    <IoMdPricetag className="price-icon"/>
                    <label className="strike-price">{itemDetails.price}</label>
                </div>
                <div className="flex-row item-price">
                    <IoMdPricetag className="price-icon"/>
                    <label>{(itemDetails.price- discountPrice).toFixed(2)}</label>
                </div>
                
            </div>
        )
    } else{
        return (
            <div className="flex-row item-price-qty">
                <label>{itemDetails.quantity}</label>
                <div className="flex-row item-price">
                    <IoMdPricetag className="price-icon"/>
                    <label>{itemDetails.price}</label>
                </div>
                
            </div>
        )
    }
    
}

const MapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (itemObj) => dispatch(addProductToCart(itemObj)),
        increaseQuantity: (itemObj) => dispatch(increaseQuantity(itemObj)),
        decreaseQuantity: (itemObj) => dispatch(decreaseQuantity(itemObj)),
        removeItemFromCart:(itemObj)=>dispatch(removeProductFromCart(itemObj))
    };
};


export default connect(null, MapDispatchToProps)(ListItem);