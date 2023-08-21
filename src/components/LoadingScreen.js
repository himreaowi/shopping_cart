import { VscLoading } from "react-icons/vsc";
function LoadingScreen(){
    return (
        <div className="flex-col flex-center">
            <VscLoading className="loading-icon" />
            <h2>Loading...</h2>
        </div>
    );
}

export default LoadingScreen;