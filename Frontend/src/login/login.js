import React from 'react';
import '../App.css';
import Header from '../Header/header';
import {designation} from '../Config/config';

class Login extends React.Component {

        render() {
            return  (
                 <div>
                     <Header />
                     <LoginComponant/>
                 </div>
             );
         }
}

class LoginComponant extends React.Component{

    render(){
        let optionData=[];
        return (
            <div>
               
               <div className="image_avatar">

               </div>

               <div className="login-form">
                <form>
                    <input type="text" className="login_name"/>
                    <select>
                        {optionData.push(<option value="Blank">--Please select--</option>)}
                        {designation.forEach(element => {
                         optionData.push(<option value={element}>{element}</option>)
                        })}
                        {optionData}
                    </select>
                </form>
               </div>


            </div>
        );
    }
}

export default Login;