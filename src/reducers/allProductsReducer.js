const initialState = {
    allProducts: [],
    productsList: [],
    filterData: [],
    searchText:"",
    isLoaded: false,
    isError: false
};
function allProductsReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_PRODUCTS_START": {
            return {
                ...state,
                isLoaded: false
            }
        }
        case "GET_PRODUCTS_ERROR": {
            return {
                ...state,
                allProducts: [],
                isLoaded: true,
                isError: true
            }
        }
        case "GET_ALL_PRODUCTS": {
            return {
                ...state,
                allProducts: action.payload,
                productsList: action.payload,
                filterData: getDropdownListData(action.payload),
                isLoaded: true
            }
        }
        case "UPDATE_FILTER_SELECTION": {
            var currSelRowObj = action.payload;
            var filterList = [...state.filterData];
            var dropdownData = [];
            for (var i = 0; i < filterList.length; i++) {
                var rowObj = Object.assign({}, filterList[i]);
                if (currSelRowObj.id === filterList[i].id) {

                    rowObj.isSelected = filterList[i].isSelected === true ? false : true;
                }
                dropdownData.push(rowObj);
            }
            return {
                ...state,
                filterData: dropdownData
            };
        }
        case "UPDATE_SEARCH_PARAM":{
            var searchTxt = action.payload;
            return{
                ...state,
                searchText: searchTxt
            };
        }
        case "FILTER_SEARCH_PRODUCTS": {
            var selTypes = getSelectedItems(state.filterData);
            var searchText = state.searchText || "";
            var searchFilter =[];
            if (selTypes.length > 0) {
                var searchProd = [];
                var filteredProd = state.productsList.filter(function (rec) {
                    if (selTypes.includes(rec.type))
                        return rec;
                });
                searchFilter = getSearchResults(searchText,filteredProd);
                return {
                    ...state,
                    allProducts: searchFilter
                };
            } else{
                var allProd = [...state.productsList];
                searchFilter = getSearchResults(searchText,allProd);
                return {
                    ...state,
                    allProducts: searchFilter
                };
            }
            
            
        }
        default:
            return state;
    }
}
/** get unique types list for the filter dropdown from all products data **/
function getDropdownListData(list) {
    var dropdownData = [];
    var dropdownJson = {};
    for (var i = 0; i < list.length; i++) {
        var keys = Object.keys(dropdownJson);
        if (!keys.includes(list[i].type)) {
            dropdownData.push({ "id": "TID_" + i, "name": list[i].type, "isSelected": false });
        }
        dropdownJson[list[i].type] = list[i].type;
    }
    return dropdownData;
}
/** get array of names of selected filter items **/
function getSelectedItems(allItems) {
    var selItems = allItems.reduce(function (arr, rec) {
        if (rec.isSelected === true) {
            arr.push(rec.name);
        }
        return arr;
    }, []);
    return selItems;
}
/** search from products list **/
function getSearchResults(searchText, list) {
    var filteredProd = [];
    if (searchText.length > 0) {
        filteredProd = list.filter(function (rec) {
            if (rec.name.toLowerCase().indexOf(searchText.toLowerCase()) >= 0)
                return rec;
        });
    } else {
        filteredProd = list;
    }
    return filteredProd;
}



export default allProductsReducer;