import React from 'react';
import '../App.css';
import {Link } from "react-router-dom";
import Header from '../Header/header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class AddQuestion extends React.Component {

        render() {
            return  (
                 <div>
                     <Header />
                     <Question/>              
                     <ToastContainer position={toast.POSITION.TOP_RIGHT}/>
                 </div>
             );
         }
}

class Question extends React.Component {

    constructor(props){
        super(props);
        this.state={
            showAnswertab:false,
            question:'',
            beforeAnsDesc:'',
            afterAnsDesc:'',
            solution:''
        }
        this.showAnswerWindow = this.showAnswerWindow.bind(this);
        this.submitQuestion = this.submitQuestion.bind(this);
    }

    submitQuestion(){
        let payload = {};
        let answerArr = [];
        let answerJson = {};
        if(this.state.question === '' || this.state.question === undefined ){
           return toast.error("Question field can't be null!");
        }else{
            payload.question=this.state.question;
        }

        if(this.state.solution!='' || this.state.solution === undefined ){
            answerJson.solution = this.state.solution;
            answerJson.beforeAnsDesc =  this.state.beforeAnsDesc;
            answerJson.afterAnsDesc =  this.state.afterAnsDesc;
            answerArr.push(answerJson);
            payload.answer = answerArr;
        }
        console.log("Final payload",payload);

        this.addQuestionToDatabase(payload);
    }
    async addQuestionToDatabase(payload) {
        const response = await fetch('http://localhost:3030/api/v1/nodes/engine/addQuestion', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const json = await response.json();
        if (json.result._id) {
            toast.success(" Question Added successfully!");
            this.setState({
                showAnswertab: false,
                question: '',
                beforeAnsDesc: '',
                afterAnsDesc: '',
                solution: ''
            });
        } else {
            toast.error("Failed to add question!");
        }
    }

    showAnswerWindow(){
        this.setState({
            showAnswertab:!this.state.showAnswertab
           
        });
    }

    handleQuestion(e){
        this.setState({
                question:e.target.value
        });
    }
    
    handleSolution(e){
        this.setState({
            solution:e.target.value
        });
    }
    handleAfterAnsDesc(e){
        this.setState({
            afterAnsDesc:e.target.value
        });
    }
    handleBeforeAnsDesc(e){
        this.setState({
            beforeAnsDesc:e.target.value
        });
    }
    
    render() {
        return  (
             <div className="questionForm">
                 <div className="quesFormHeader"> Add Question </div>
                 <div className="quesRow" >
                    <label>Question</label>
                    <input type="text" id="question" onChange={this.handleQuestion.bind(this)} className="quesName" placeholder="Enter your question.."/>
                 </div>
                 {this.state.showAnswertab?<a href="#" onClick={this.showAnswerWindow}>Hide?</a>:<a href="#" onClick={this.showAnswerWindow}>Click, If you know the answer?</a>}
                 {this.state.showAnswertab?
                 <div>

                    <div className="quesRow" >
                    <label>Before Solution Description</label>
                    <input type="text" id="beforeAnsDesc" onChange={this.handleBeforeAnsDesc.bind(this)} className="beforeAnsDesc" placeholder="Enter your..."/>
                 </div>

                 
                 <div className="quesRow" >
                    <label>Solution</label>
                    <textarea rows="15" cols="50" id="actualSolution" onChange={this.handleSolution.bind(this)} className="actualSolution" placeholder="Enter your solution..."/>
                 </div>

                 <div className="quesRow" >
                    <label>After Solution Description</label>
                    <input type="text" id="afterAnsDesc" className="afterAnsDesc" onChange={this.handleAfterAnsDesc.bind(this)} placeholder="Enter your..."/>
                 </div>


                 </div>
                 :null}
                 
                 <div className="quesRow" >
                    <button  onClick={this.submitQuestion} className="submitQuestion">Submit</button>
                 </div>

             </div>
         );
     }

}

export default AddQuestion;