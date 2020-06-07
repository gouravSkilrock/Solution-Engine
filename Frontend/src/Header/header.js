import React from 'react';
import '../App.css';
import Logo from '../assests/images/SolutionEngine_Logo-3.jpg';
import {Link } from "react-router-dom";
import personLogo from '../assests/images/person.png';
import logoutImage from '../assests/images/logout-1.png';
import { Redirect } from 'react-router';
import Translation from '../Translation/en';
import bell_Icon from '../assests/images/bell-icon.png';

class Header extends React.Component {

    constructor(props){
        super(props);
        this.state = props;
        this.state = {
            loginData: localStorage.getItem('loginData')!==""?JSON.parse(localStorage.getItem('loginData')):"",
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
                  {this.state.loginData!==""?<div><label>{this.state.loginData.name}</label> </div>:<div><label>Unknown User</label> </div>} 
                </div>
                <div style={{display:"inline-flex",float:"right",padding:"25px 15px 0px 0px"}}>
                    <a href="#" class="notification">
                        {/* <span>Inbox</span> */}
                        <img src={bell_Icon} style={{width:"25px",height:"25px"}} alt="bell-icon" />
                        <span class="badge">3</span>
                    </a>
                </div>
            </div>


        );
    }

}

export default Header;