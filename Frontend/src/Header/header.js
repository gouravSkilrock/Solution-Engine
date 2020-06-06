import React from 'react';
import '../App.css';
import Logo from '../assests/images/SolutionEngine_Logo-3.jpg';
import {Link } from "react-router-dom";
import personLogo from '../assests/images/person.png';
import logoutImage from '../assests/images/logout-1.png';
import { Redirect } from 'react-router';
import Translation from '../Translation/en';

class Header extends React.Component {

    constructor(props){
        super(props);
        this.state = props;
        this.state = {
            loginData: JSON.parse(localStorage.getItem('loginData')),
            redirect:false
        }
        this.logoutUser = this.logoutUser.bind(this);
    }
    logoutUser(){
        localStorage.setItem('loginData','');
        this.setState({
            redirect:true
        });
    }
    render() {
        if (this.state.redirect) {
            return <Redirect push to={{ pathname:'/'}} />;
        }
        console.log(this.state);
        return (

            <div className="header">
                <Link to="/search">
                <img src={Logo} alt="SE_LOGO"/>
                </Link>
                    <a href="/search" className="logo">{Translation.projectTitle}</a>
                <div className="header-right">
                  <img src={personLogo} alt="Person Logo"    /><img src={logoutImage} onClick={this.logoutUser} style={{position:"absolute",width:"75px"}} alt="logout image" /> 
                  <div><label>{this.state.loginData.name}</label> </div> 
                </div>
            </div>


        );
    }

}

export default Header;