import React from 'react';
import '../App.css';
//import {Link } from "react-router-dom";
import Header from '../Header/header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Config from '../Config/config';


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
            loginData: JSON.parse(localStorage.getItem('loginData'))
        }
        this.showAnswerWindow = this.showAnswerWindow.bind(this);
        this.submitQuestion = this.submitQuestion.bind(this);
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

        if (this.state.solution !== '' || this.state.solution === undefined) {
            answerJson.solution = this.state.solution;
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

        console.log("Final payload", payload);

        this.addQuestionToDatabase(payload);
    }
    async addQuestionToDatabase(payload) {
        const response = await fetch('http://localhost:3030/api/v1/nodes/engine/addQuestion', {
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


    render() {
        let optionData = [];
        return (
            <div className="questionForm">
                <div className="quesFormHeader"> Add Question </div>
                <div className="quesRow" >
                    <label>Question</label>
                    <input type="text" value={this.state.question} id="question" onChange={this.handleQuestion.bind(this)} className="quesName" placeholder="Enter your question.." />
                </div>
                {this.state.showAnswertab ? <a href="#" onClick={this.showAnswerWindow}>Hide?</a> : <a href="#" onClick={this.showAnswerWindow}>Click, If you know the answer?</a>}
                {this.state.showAnswertab ?
                    <div>

                        <div className="quesRow" >
                            <label>Before Solution Description</label>
                            <input type="text" id="beforeAnsDesc" onChange={this.handleBeforeAnsDesc.bind(this)} className="beforeAnsDesc" placeholder="Enter your..." />
                        </div>


                        <div className="quesRow" >
                            <label>Solution</label>
                            <textarea rows="15" cols="50" id="actualSolution" onChange={this.handleSolution.bind(this)} className="actualSolution" placeholder="Enter your solution..." />
                        </div>

                        <div className="quesRow" >
                            <label>After Solution Description</label>
                            <input type="text" id="afterAnsDesc" className="afterAnsDesc" onChange={this.handleAfterAnsDesc.bind(this)} placeholder="Enter your..." />
                        </div>
                        {this.state.loginData===undefined ?

                            <div>

                                <div className="quesRow" >
                                    <label>Enter your Name</label>
                                    <input type="text" id="username" className="username" onChange={this.handleUsername.bind(this)} placeholder="Enter your Name..." />

                                </div>

                                <div className="quesRow" >
                                    <label>Your Designation</label>
                                    <select onChange={this.handleDesignation.bind(this)}>
                                        {optionData.push(<option value="Blank">--Please select--</option>)}
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
                    <button onClick={this.submitQuestion} className="submitQuestion">Submit</button>
                </div>

            </div>
        );
    }

}

export default AddQuestion;