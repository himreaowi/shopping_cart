import { BsFillXSquareFill, BsSearch } from "react-icons/bs";
import {useState} from 'react';
import '../styles/SearchBar.css';

function SearchBar(props) {
    const [searchTxt,updateSearchValue] = useState("");

    const onSearch = (event) => {
        updateSearchValue(event.target.value);
        props.searchProducts(event.target.value);
    };
    const clearSearch = (event)=>{
        updateSearchValue("");
        props.searchProducts(event.target.value);
    }
    return (
        <div>
            <div className=" flex-row search-bar">
                <div >
                    <BsSearch className="search-icon" />
                </div>
                <input type="text" value = {searchTxt} onChange={(e) => onSearch(e)}></input>
                {searchTxt.length > 0 && 
                 <div className="search-close-cont" onClick={(e) => clearSearch(e)}>
                    <BsFillXSquareFill className="search-icon" />
                </div>
                }
            </div>

        </div>
    );
}

export default SearchBar;