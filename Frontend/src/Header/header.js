import React from 'react';
import '../App.css';
import Logo from '../assests/images/SolutionEngine_Logo-3.jpg';
import {Link } from "react-router-dom";

class Header extends React.Component {

    constructor(props){
        super(props);
        this.state = props;
    }

    render() {
        console.log(this.state);
        return (

            <div className="header">
                <Link to="/">
                <img src={Logo} alt="SE_LOGO"/>
                </Link>
                <a href="/" className="logo">Solution Engine</a>
                {/* <div className="header-right">
                   {this.state.isSearchBarRequired?<input className="searchBar_logo" type="text" name="search" placeholder="Search..." />:null} 
                </div> */}
            </div>


        );
    }

}

export default Header;