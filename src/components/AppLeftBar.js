import { Link } from "react-router-dom";
import { AiOutlineShop, AiFillInfoCircle } from "react-icons/ai";
import { IoIosCart } from "react-icons/io";
import {FcShop} from 'react-icons/fc';
import  '../styles/AppLeftBar.css';

function AppLeftBar() {
    //<i className="fas fa-store"></i>
    //<i class="fas fa-shopping-cart"></i>
    //<i class="fas fa-tag"></i>
    //<i class="fas fa-plus"></i>
    //<i class="fas fa-minus"></i>
    //<i class="fas fa-address-card"></i>
    return (
        <div className="nav-cont">
            <div className = "nav-home"><Link to="/"><FcShop className ="leftbar-icon"/><span>HOME MARKET</span></Link></div>
            <ul >
                <li> <Link to="/"><AiOutlineShop className ="leftbar-icon"/> <span>SHOP</span></Link></li>
                <li><Link to="/mycart"><IoIosCart className ="leftbar-icon"/><span> MY CART</span></Link></li>
                <li> <Link to="/contact"><AiFillInfoCircle className ="leftbar-icon"/> <span>CONTACT</span></Link></li>
            </ul>

        </div>
    );
}

export default AppLeftBar;