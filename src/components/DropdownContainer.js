import { useState } from 'react';
import {connect} from 'react-redux';
import DropdownList from './DropdownList';
import { filterSearchProducts, updateFilterSelection } from "../actions/productActions.js";
import {BsChevronDown, BsFillXSquareFill} from "react-icons/bs";
import '../styles/DropdownList.css';


function DropdownContainer(props) {

    const [isListVisible, showHideList] = useState(false);
    const onRowItemSelection = (rowObj) => {
        props.onOptionSelected(rowObj);
        props.filterProducts();
    };
    //update state to show/hide the dropdown list
    const showHideDropdownList = ()=>{
      var showList = !isListVisible;
      showHideList(showList);
    };

    var selectedCount = getSelectedItemsCount(props.filterData);
    var selectedText = selectedCount && selectedCount > 0 ? "Product Type ("+ selectedCount+")" : "Product Type" ;
    return (
       
        <div className = "dropdownCont">
            <div className="flex-row dropdownHeader">
                <div className="flex-row dd-select-cont" /**onClick={() => showHideDropdownList()}**/>
                    <label>{selectedText}</label>
                    <BsChevronDown className="dd-arrow-icon" />
                </div>
                {selectedCount > 0 &&
                    <div onClick = {clearDropdownSelection.bind(this,props)}>
                        <BsFillXSquareFill className="dd-clear-icon" />
                    </div>
                }
            </div>
            <DropdownList listItems={props.filterData} updateListItem={onRowItemSelection}/>
        </div>
    );
}

//get count of selected items in dropdown list
function getSelectedItemsCount (allItems){
   var selItems =[];
   selItems = allItems.filter(function(rec){
       return rec.isSelected === true;
   });
   return selItems.length;
}

//clear's all the dropdown selected items
function clearDropdownSelection (props){
    var filterData = props.filterData;
    for (var i = 0; i < filterData.length; i++) {
        if (filterData[i].isSelected === true) {
            props.onOptionSelected(filterData[i]);
            props.filterProducts();
        }
    }
}

const mapStateToProps = state => {
    return{
        filterData: state.products.filterData,
    };
};
const MapDispatchToProps = (dispatch) => {
    return {
        filterProducts: (itemObj) => dispatch(filterSearchProducts(itemObj)),
        onOptionSelected:(itemObj) => dispatch(updateFilterSelection(itemObj))
    };
};


export default connect(mapStateToProps, MapDispatchToProps)(DropdownContainer);