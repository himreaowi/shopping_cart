export const fetchAllProducts = (products) => {
  return {
    type: "GET_ALL_PRODUCTS",
    payload: products
  }
};
export const fetchAllProductsStart = () => {
  return {
    type: "GET_PRODUCTS_START",
    payload: ""
  }
};
export const fetchAllProductsError = (error) => {
  return {
    type: "GET_PRODUCTS_ERROR",
    payload: error
  }
};
export const filterSearchProducts = () => {
  return {
    type: "FILTER_SEARCH_PRODUCTS",
    payload: ""
  }
};
export const updateFilterSelection = (input) => {
  return {
    type: "UPDATE_FILTER_SELECTION",
    payload: input
  }
};
export const updateSearchParam = (searchInput) => {
  return {
    type: "UPDATE_SEARCH_PARAM",
    payload: searchInput
  }
};

