import React from 'react';
import '../App.css';
import Logo from '../assests/images/SolutionEngine_Logo-1.jpg';
import {Link } from "react-router-dom";

class Header extends React.Component {

    render() {
        return (

            <div className="header">
                <Link to="/">
                <img src={Logo} alt="SE_LOGO"/>
                </Link>
                <a href="/" className="logo">Solution Engine</a>
                <div className="header-right">
                    <input className="searchBar_logo" type="text" name="search" placeholder="Search..." />
                </div>
            </div>


        );
    }

}

export default Header;