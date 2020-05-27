import React from 'react';
import '../App.css';
import {Link } from "react-router-dom";
import Header from '../Header/header';

class UserWiseReport extends React.Component {
        constructor(props){
            super(props)
            this.state={
                loginData:props.location.loginData
            }
        }
        render() {
            return  (
                 <div>
                     <Header />
                     <div>
                     Welcome   
                     </div>
                 </div>
             );
         }
}

export default UserWiseReport;