
import './App.css';
import AppLeftBar from './AppLeftBar';
import ShopListContainer from './ShopListContainer';
import CartPage from './CartPage';
import ContactPage from './ContactPage';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {
  return (
    <Router>
      <div className="App">
        <AppLeftBar />
        <Switch>
          <Route exact path='/' component= {ShopListContainer}></Route>
          <Route exact path='/mycart' component = {CartPage}></Route>
          <Route exact path='/contact' component= {ContactPage}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
