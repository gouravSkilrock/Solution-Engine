import React from 'react';
import '../assests/css/login.css';
import Config from '../Config/config';
import personLogo from '../assests/images/person.png';
import { Redirect } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let baseUrl = Config.protocol+"://"+Config.host+":"+Config.port; 

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signup: false,
            loginUsername:'',
            loginName:'',
            loginDesignation:'',
            loginData:'',
            redirect:false,
            isEnterkeyPress:false
        }
    }
    
    render() {
        return (
            <div>
                <LoginComponant data={this.state} />
            </div>
        );
    }
}

class LoginComponant extends React.Component {

    constructor(props) {
        super(props);
        this.state = props.data

        this.showSignupWindow = this.showSignupWindow.bind(this);
        this.handleDesignation = this.handleDesignation.bind(this);
        this.userSingUp = this.userSingUp.bind(this);
        this.letslogin = this.letslogin.bind(this);
        this._handleKeyDown = this._handleKeyDown.bind(this);

    }
    handleDesignation(e) {
        this.setState({
            loginDesignation: e.target.value
        });
    }
    showSignupWindow(){
        this.setState({
            signup: !this.state.signup
        });
    }
    getDisplayName(e){
        this.setState({
            loginName: e.target.value
        });
    }
    getUserName(e){
        this.setState({
            loginUsername: e.target.value
        });
    }
    async letslogin() {
        
        if (this.state.loginUsername && this.state.loginUsername !== undefined) {
            const response = await fetch(baseUrl+""+Config.login+'?username=' + this.state.loginUsername, {
                method: 'get',
                headers: { 'Content-Type': 'application/json' }
                //body: JSON.stringify(payload)
            });
            const json = await response.json();
            console.log("Login object",json.result[0]._id);
            if (json.result && json.result[0]._id) {
                localStorage.setItem('loginData',JSON.stringify(json.result[0]));
                this.setState({
                    loginData:json.result[0],
                    redirect:true
                });
                
                //alert("Login Successfull");
            } else {
                toast.error(json.result);
            }
        }
    }
    async userSingUp(){
        
        if (this.state.loginUsername && this.state.loginUsername !== undefined && this.state.loginName!==undefined && this.state.loginDesignation!==undefined) {
            let payload = {
                username:this.state.loginUsername,
                name:this.state.loginName,
                designation:this.state.loginDesignation
            }
            const response = await fetch(baseUrl+""+Config.signUpUser, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const json = await response.json();
            console.log("SignUp object",json);
            if (json.result && json.result._id) {
                localStorage.setItem('loginData',JSON.stringify(json.result));
                this.setState({
                    loginData:json.result,
                    redirect:true
                });
                //alert("SignUp Successfull");
            } else {
                toast.error(json.result);
            }
        }
    }

    _handleKeyDown(e){
        if (e.key === 'Enter') {
            if(this.state.signup){
                if(this.state.loginUsername==="" && this.state.loginName==="" && this.state.loginDesignation===""){
                    toast.error("Username, Name, Designation fields are mandatory");
                 }else{
                    this.userSingUp()
                 }
            }else{
                if(this.state.loginUsername===""){
                    toast.error("Username field can't be empty!");
                 }else{
                    this.letslogin()
                 }
            }
          
        }else{

        }
      }
    render() {
        let optionData = [];
        if (this.state.redirect) {
            return <Redirect push to={{ pathname:'/search', loginData:this.state.loginData}} />;
        }
        return (
            <div>
                 <ToastContainer position={toast.POSITION.TOP_RIGHT} />
                <div id="id01" className="login-modal">
                    <div>
                        <div className="imgcontainer">
                            <img src={personLogo} alt="Avatar" className="avatar"></img>
                        </div>
                        <div className="login_container">
                            <label><b>Username</b></label>
                            <input type="text" className="login_username" onChange={this.getUserName.bind(this)} placeholder="Enter your username" name="uname" onKeyPress={this._handleKeyDown} />
                            
                            {this.state.signup?<a href="#" onClick={this.showSignupWindow}>Hide?</a>:<a href="#" onClick={this.showSignupWindow}>SignUp?</a>}
                            {this.state.signup ?

                                <div>
                                    <label><b>Your Name</b></label>
                                    <input type="text" className="login_name" onChange={this.getDisplayName.bind(this)} placeholder="Enter your name" name="name" onKeyPress={this._handleKeyDown} />
                                    <label ><b>Your Designation</b></label>
                                    <select className="login_designation" onChange={this.handleDesignation.bind(this)}>
                                        {optionData.push(<option value="Blank">--Please select--</option>)}
                                        {Config.designation.forEach(element => {
                                            optionData.push(<option value={element}>{element}</option>)
                                        })}
                                        {optionData}
                                    </select>

                                </div>

                                : null}
                                {this.state.signup ?<button onClick={this.userSingUp} className="login_submit">SignUp & Login</button>:<button  onClick={this.letslogin} className="login_submit">Login</button>}
                            

                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Login;