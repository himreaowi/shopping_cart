import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import './App.css';

function DropdownList(props) {

    var items = props.listItems;
    const rowItemClickHandler = (rowObj) => {
        props.updateListItem(rowObj);
    }
    var listToShow = items.map(function (rec) {
        return (
            <div key={rec.id} className = "dropdownRow" onClick={rowItemClickHandler.bind(this, rec)}>
                   {rec.isSelected === true ? <ImCheckboxChecked className="dd-checkbox"onClick={rowItemClickHandler.bind(this, rec)}/> :
                    <ImCheckboxUnchecked className="dd-checkbox" />}
                    
                <p>{rec.name}</p>
            </div>
        );
    });

    return (
        <div className ="dropdownListCont">{listToShow}</div>
    );
}

export default DropdownList;