
function CartPurchaseTotal(props) {
    var productsTable = ProductsTable(props.productsList);
    var totalAmount = getTotalAmount(props.productsList);
    return (
        <div className="total-cont">
            <div className="header-total-cont">
                <label>PRODUCTS CHECKOUT</label>
            </div>
            <div>
                <table className="table-total">
                    <tr>
                        <th>Item Name</th>
                        <th>Count</th>
                        <th>Price</th>
                    </tr>
                    {productsTable}
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Total Amount:</th>
                            <th>{totalAmount}</th>
                        </tr>
                    </tfoot>
                </table>
            </div>

        </div>
    );
}

function ProductsTable(products) {
    var listTemplate = products.map(function (product) {
        return (
            <tr>
                <td>{product.name}</td>
                <td>{product.productCount}</td>
                <td>{product.offerPercentage !== 0 ? product.discountPrice.toFixed(2) : product.totalPrice.toFixed(2)}</td>
            </tr>
        );
    });
    return listTemplate;
}
function getTotalAmount(products){
    var total =0;
    for(var i=0; i< products.length;i++){
        var price  = products[i].offerPercentage !== 0 ? products[i].discountPrice.toFixed(2) :products[i].totalPrice.toFixed(2);
        total = total +parseFloat(price);
    }
    return total;
}

export default CartPurchaseTotal;