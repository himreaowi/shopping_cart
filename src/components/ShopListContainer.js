import {useEffect} from 'react';
import ListItem from './ListItem';
import DropdownContainer from './DropdownContainer';
import SearchBar from './SearchBar';
import LoadingScreen from './LoadingScreen';
import ErrorScreen from './ErrorScreen';
import {connect} from 'react-redux';
import { fetchAllProducts,fetchAllProductsStart,fetchAllProductsError,
         filterSearchProducts, updateSearchParam } from "../actions/productActions.js";

function ShopListContainer(props){
    
    useEffect(()=>{
        callFetchProducts(props);
    },[]);

    var productsContainer;
    if (props.productsToShow.length > 0) {
        productsContainer = props.productsToShow.map(function (product) {
            var productDetails = product;
            //check if product available in cart
            var filterForAddedList = props.addedProducts.filter((item)=>{
                if(product.pId === item.pId)
                 return item;
            });
            if(filterForAddedList.length > 0){
                productDetails = filterForAddedList[0];
            }
            return (
                <ListItem key ={productDetails.pId} 
                          itemDetails={productDetails} 
                          isAdded = {filterForAddedList.length>0 ? true:false}
                          isCartScreen = {false}
                          quantity = {productDetails.productCount ?productDetails.productCount :1}
                />
            )
            
        });
    } else if(props.isLoaded === false){
        productsContainer = <LoadingScreen/>;
    } else if(props.isLoaded === false && props.isError === true){
        productsContainer = <ErrorScreen/>;
    }
    return(
        <div>
            <div className="flex-row filter-search-cont">
                <div className="filter-cont">
                    <DropdownContainer />
                </div>
                <div className="search-cont">
                    <SearchBar searchProducts ={searchForProducts.bind(this,props)}/>
                </div>
            </div>

            {props.isLoaded === false &&
                <div className="loading-error-screen">
                    {productsContainer}
                </div>
            }
            {props.isLoaded === true &&
                <div className="flex-row list-cont">
                    {productsContainer}
                </div>
            }
        </div>
        


    )
}
/** search for products **/
function searchForProducts(props,searchText){
  props.updateSearchParam(searchText);
  props.searchProducts();
}
/** Fetch products API call **/
const callFetchProducts = (props) =>{
    props.fetchAllProductsStart();
    fetch('groceryProducts.json')
    .then(function(response){
        var list = [];
        if(response.status === 200)
          return response.json();
        else
          props.fetchAllProductsError();
      })
      .then(function(resJson) {
        props.fetchAllProducts(resJson);
      });
  }

const mapStateToProps = state => {
    return{
        productsList: state.products.productsList,
        productsToShow: state.products.allProducts,
        addedProducts: state.cart.products,
        isLoaded: state.products.isLoaded,
        isError: state.products.isError,
    }
};
const MapDispatchToProps = (dispatch) => {
    return {
        fetchAllProducts: (products) => dispatch(fetchAllProducts(products)),
        fetchAllProductsStart:()=>dispatch(fetchAllProductsStart()),
        fetchAllProductsError:()=>dispatch(fetchAllProductsError()),
        updateSearchParam:(searchText)=>dispatch(updateSearchParam(searchText)),
        searchProducts : ()=>dispatch(filterSearchProducts())

    };
};


export default connect (mapStateToProps,MapDispatchToProps)(ShopListContainer);

