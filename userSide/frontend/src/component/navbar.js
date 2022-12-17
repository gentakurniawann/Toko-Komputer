import react from "react";
import {Link} from "react-router-dom";
import Media from "./media";

export default class Navbar extends react.Component{
    Logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("customer")
        window.location = "/login"
    }

    render(){
        return(
            <div className="navbar">
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="container-fluid">
                        <Link class="navbar-brand" to="/">
                            <Media value image="aistore-logo" width="" height=""/>
                        </Link>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <ul class="navbar-nav">
                                <li className="nav-item">
                                    <Link to="/" className="nav-link">
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/product" className="nav-link">
                                        Product
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/cart" className="nav-link">
                                        Cart
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/" className="nav-link">
                                        Transactions
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/" className="nav-link" onClick={() => this.Logout()}>
                                        Logout
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}