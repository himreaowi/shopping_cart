import {MdError} from "react-icons/md";

function ErrorScreen(){
    return (
        <div className="flex-col flex-center">
            <MdError className="error-icon" />
            <h2>ERROR</h2>
        </div>
    );
}
export default ErrorScreen;