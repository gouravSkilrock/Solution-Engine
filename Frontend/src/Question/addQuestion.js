import React from 'react';
import '../App.css';
//import {Link } from "react-router-dom";
import Header from '../Header/header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Config from '../Config/config';
import Translation from '../Translation/en';

let baseUrl = Config.protocol+"://"+Config.host+":"+Config.port;


class AddQuestion extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <Header />
                <Question />
                <ToastContainer position={toast.POSITION.TOP_RIGHT} />
            </div>
        );
    }
}

class Question extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showAnswertab: false,
            question: '',
            beforeAnsDesc: '',
            afterAnsDesc: '',
            solution: '',
            username: '',
            designation: '',
            loginData: localStorage.getItem('loginData')!==""?JSON.parse(localStorage.getItem('loginData')):undefined
        }
        this.showAnswerWindow = this.showAnswerWindow.bind(this);
        this.submitQuestion = this.submitQuestion.bind(this);
        this._handleKeyDown = this._handleKeyDown.bind(this);
    }

    submitQuestion() {
        let payload = {};
        let answerArr = [];
        let answerJson = {};
        let userJson = {};
        if (this.state.question === '' || this.state.question === undefined) {
            return toast.error("Question field can't be null!");
        } else {
            payload.question = this.state.question;
        }
        if(this.state.showAnswertab){
            
        if (this.state.solution !== '' || this.state.solution === undefined) {
            answerJson.solution = this.state.solution;
        }else{
            return toast.error("Solution field can't be null!");
        }
        if (this.state.beforeAnsDesc !== '' || this.state.beforeAnsDesc === undefined) {
            answerJson.beforeAnsDesc = this.state.beforeAnsDesc;
        }
        if (this.state.afterAnsDesc !== '' || this.state.afterAnsDesc === undefined) {
            answerJson.afterAnsDesc = this.state.afterAnsDesc;
        }
        if(this.state.loginData!==undefined){
            if (this.state.loginData.name !== '' || this.state.loginData.name === undefined) {
                userJson.username = this.state.loginData.name;
            } else {
                userJson.username = "Unknown User";
            }
            if (this.state.loginData.designation !== '' || this.state.loginData.designation !== undefined || this.state.loginData.designation === 'Blank') {
                userJson.designation = this.state.loginData.designation;
            } else {
                userJson.designation = "Unknown Designation";
            }
        }else{
            if (this.state.username !== '' || this.state.username === undefined) {
                userJson.username = this.state.username;
            } else {
                userJson.username = "Unknown User";
            }
            if (this.state.designation !== '' || this.state.designation !== undefined || this.state.designation === 'Blank') {
                userJson.designation = this.state.designation;
            } else {
                userJson.designation = "Unknown Designation";
            }
        }
        answerJson['userInfo'] = userJson;
        answerArr.push(answerJson);
        payload.answer = answerArr;
        }
        console.log("Final payload", payload);

        this.addQuestionToDatabase(payload);
    }
    async addQuestionToDatabase(payload) {
        const response = await fetch(baseUrl+''+Config.addQuestion, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const json = await response.json();
        if (json.result && json.result._id) {
            toast.success(" Question Added successfully!");
            this.setState({
                showAnswertab: false,
                question: '',
                beforeAnsDesc: '',
                afterAnsDesc: '',
                solution: '',
                username: '',
                designation: ''
            });
        } else {
            toast.error("Failed to add question!");
        }
    }

    showAnswerWindow() {
        this.setState({
            showAnswertab: !this.state.showAnswertab

        });
    }

    handleQuestion(e) {
        this.setState({
            question: e.target.value
        });
    }

    handleSolution(e) {
        this.setState({
            solution: e.target.value
        });
    }
    handleAfterAnsDesc(e) {
        this.setState({
            afterAnsDesc: e.target.value
        });
    }
    handleBeforeAnsDesc(e) {
        this.setState({
            beforeAnsDesc: e.target.value
        });
    }

    handleUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    handleDesignation(e) {
        this.setState({
            designation: e.target.value
        });
    }

    _handleKeyDown(e){
        if (e.key === 'Enter') {
            this.submitQuestion();
        }
    }

    render() {
        let optionData = [];
        return (
            <div className="questionForm">
                <div className="quesFormHeader">{Translation.questiontitle}</div>
                <div className="quesRow" >
                    <label>{Translation.question}</label>
                    <input type="text" value={this.state.question} id="question" onChange={this.handleQuestion.bind(this)} className="quesName" placeholder={Translation.placeholderQuestion} onKeyPress={this._handleKeyDown} />
                </div>
                {this.state.showAnswertab ? <a href="#" onClick={this.showAnswerWindow}>Hide?</a> : <a href="#" onClick={this.showAnswerWindow}>{Translation.knowAnswer}</a>}
                {this.state.showAnswertab ?
                    <div>

                        <div className="quesRow" >
                            <label>{Translation.beforeAnsDesc}</label>
                            <input type="text" id="beforeAnsDesc" onChange={this.handleBeforeAnsDesc.bind(this)} className="beforeAnsDesc" placeholder={Translation.placeholderBeforeSolution} />
                        </div>


                        <div className="quesRow" >
                            <label>{Translation.solution}</label>
                            <textarea rows="15" cols="50" id="actualSolution" onChange={this.handleSolution.bind(this)} className="actualSolution" placeholder={Translation.placeholderSolution} />
                        </div>

                        <div className="quesRow" >
                            <label>{Translation.afterAnsDesc}</label>
                            <input type="text" id="afterAnsDesc" className="afterAnsDesc" onChange={this.handleAfterAnsDesc.bind(this)} placeholder={Translation.placeholderAfterSolution} />
                        </div>
                        {this.state.loginData===undefined ?

                            <div>

                                <div className="quesRow" >
                                    <label>{Translation.displayName}</label>
                                    <input type="text" id="username" className="username" onChange={this.handleUsername.bind(this)} placeholder={Translation.placeholderDisplayName} />

                                </div>

                                <div className="quesRow" >
                                    <label>{Translation.designation}</label>
                                    <select onChange={this.handleDesignation.bind(this)}>
                                        {optionData.push(<option value="Blank">{Translation.placeholderDefaultDesignationText}</option>)}
                                        {Config.designation.forEach(element => {
                                            optionData.push(<option value={element}>{element}</option>)
                                        })}
                                        {optionData}
                                    </select>
                                </div>


                            </div>

                            : null}

                    </div>
                    : null}




                <div className="quesRow" >
                    <button onClick={this.submitQuestion} className="submitQuestion">{Translation.submit}</button>
                </div>

            </div>
        );
    }

}

export default AddQuestion;