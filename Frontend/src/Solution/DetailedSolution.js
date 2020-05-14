import React from 'react';
import '../App.css';
import personLogo from '../assests/images/person.png';
import likeLogo from '../assests/images/like.png';
import upvoteLogo from '../assests/images/upvote.png';
import { Link } from "react-router-dom";
import Logo from '../assests/images/SolutionEngine_Logo-1.jpg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../Header/header';
import Popup from "reactjs-popup";

class DetailedSolution extends React.Component {

    constructor(props){
        super(props);
        this.state={
            questionId:props.match.params.questionId,
            resultSet:'',
            showAnswerBox:false,
            newBeforeAns:'',
            newSolution:'',
            newAfterAns:'',
            newComment:'',
            newUsername:'',
            newDesignation:''
        }
    }

    componentWillMount(){
        this.fetchQuestionData();
    }
    fetchQuestionData= async () => {
        fetch('http://localhost:3030/api/v1/nodes/engine/getAllQuestionRelatedData/'+this.state.questionId)
            .then(response => response.json())
            .then(json => this.setState({ resultSet:json}))
    }
    render() {
        console.log(this.state.resultSet);
        return (
            <div>
                <Header isSearchBarRequired={"false"}/>
                {this.state.resultSet?<FeedCluster data = {this.state} />:null}
                <ToastContainer position={toast.POSITION.TOP_RIGHT}/>
            </div>
        );
    }
}

class FeedCluster extends React.Component {
    constructor(props){
        super(props)
        this.state=props.data
    }
    render() {
        return (
            <div className="feedCluster">
                {this.state.resultSet?<Feed data={this.state}/>:null}
                
            </div>
        );
    }

}

class Feed extends React.Component {

    constructor(props){
        super(props)
        this.state=props.data;
        this.handleAnswerBox =this.handleAnswerBox.bind(this);
        this.submitAnswer = this.submitAnswer.bind(this);
    }
    handleAnswerBox(){
        this.setState({
            showAnswerBox:!this.state.showAnswerBox
        });
    }

    handleBeforeAns(e){
        this.setState({
            newBeforeAns:e.target.value
        });
    }

    
    handleAfterAns(e){
        this.setState({
            newAfterAns:e.target.value
        });
    }

    
    handleSolution(e){
        this.setState({
            newSolution:e.target.value
        });
    }

    async submitAnswer() {

        if (this.state.newSolution === "") {
            return toast.error("Answer can't be null");
        } else {
            let answerPayload = {
                solution: this.state.newSolution,
                beforeAnsDesc: this.state.newBeforeAns,
                afterAnsDesc: this.state.newAfterAns
            };
            let payload = {
                qid: this.state.questionId,
                answer: answerPayload
            }

            const response = await fetch('http://localhost:3030/api/v1/nodes/engine/addAnswer', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const json = await response.json();
            if (json.result._id) {
                toast.success(" Answer Added successfully!");
                this.setState({
                    solution: '',
                    beforeAnsDesc: '',
                    afterAnsDesc: '',
                    showAnswerBox:false,
                });
            } else {
                toast.error("Failed to add Answer!");
            }



        }
    }

    render() {
        let AnserClusterData = [];
        let ansCount= this.state.resultSet.result.answer?this.state.resultSet.result.answer.length:0;
        return (
            <div className="feed">
                <div className="feedQuestion">{this.state.resultSet.result.question}</div>
                <div className="feedAddAnswer" onClick={this.handleAnswerBox}> Add Answer </div>
                
                {this.state.showAnswerBox?
                
                <div className="feedAddAnswerBox">
                    <input onChange={this.handleBeforeAns.bind(this)} placeholder="Enter before answer..."></input>
                    <textarea onChange={this.handleSolution.bind(this)} placeholder="Enter solution..." ></textarea>
                    <input onChange={this.handleAfterAns.bind(this)} placeholder="Enter after answer..."></input>
                    <button onClick={this.submitAnswer}>Submit</button>
                </div>
                
                :null}
                
                
                <div className="totalAnswer">
                    <div className="totalAnswerCount">{ ansCount+' Answers'}</div>
                </div>
                
                {
                    this.state.resultSet.result.answer?this.state.resultSet.result.answer.forEach(element => {
                        AnserClusterData.push(<AnserCluster answerData={element} questionData={this.state} />)
                    }):null
                }
                {AnserClusterData}
            </div>
        );
    }
}

class AnserCluster extends React.Component {

    constructor(props){
        super(props)
        this.state=props.answerData
        this.state.questionData=props.questionData
        this.state.open=false

        this.postComment =this.postComment.bind(this);
        this.handleUpVote = this.handleUpVote.bind(this);
        this.handleAnswerLike = this.handleAnswerLike.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({ open: true });
    }
    closeModal() {
        this.setState({ open: false });
    }
     
    async handleUpVote(){
        let payload = {
            aid:this.state._id
        }

        const response = await fetch('http://localhost:3030/api/v1/nodes/engine/upvoteAnswer', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const json = await response.json();
        if (json.result._id) {
            toast.success("Upvoted");
        } else {
            toast.error("Failed to upvoted");
        }
    
    }

    
    async handleAnswerLike(){
        let payload = {
            aid:this.state._id
        }

        const response = await fetch('http://localhost:3030/api/v1/nodes/engine/addlike', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const json = await response.json();
        if (json.result._id) {
            toast.success("Liked");
        } else {
            toast.error("Failed to like");
        }
    
    }

    handleChangeComment(e){
        this.setState({
            newComment:e.target.value
        });
    }

    handleDesignation(e){
        this.setState({
                newDesignation:e.target.value,
        });
    }

    handleName(e){
        this.setState({
                newUsername:e.target.value
        });
    }
    
    async postComment(){
        if(this.state.newComment==="" || this.state.newComment===undefined){
            return toast.error("Comments can't be null");
        }else{
            
            let userCommentInfo = {};
            if(this.state.newUsername && this.state.newUsername!==''){
                userCommentInfo.username = this.state.newUsername
            }else{
                userCommentInfo.username = "Unknown User"
            }
            if(this.state.newDesignation && this.state.newDesignation!==''){
                userCommentInfo.designation = this.state.newDesignation
            }else{
                userCommentInfo.designation = "Unknown Designation"
            }

            let commentPayload = {
                'title':this.state.newComment,
                'userCommentInfo':userCommentInfo
            }
            let payload = {
                aid:this.state._id,
                comments:commentPayload
            }

            const response = await fetch('http://localhost:3030/api/v1/nodes/engine/addComment', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const json = await response.json();
            if (json.result._id) {
                toast.success(" Comments Added successfully!");
                this.setState({
                    newComment:'',
                    newUserCommentInfo : {
                        username:'',
                        designation:''
                    }
                });
                this.closeModal();
            } else {
                toast.error("Failed to add comments!");
            }

        }
    }

    render() {
        let commentData=[];
        console.log(" Answer set : ",this.state);
        return (
            <div className="answerCluster">
                <div className="userDetails">
                    <div className="userlogo"><img src={personLogo} alt="Person" /></div>
                    <div className="userName">{this.state.userInfo?this.state.userInfo.username:"Unknown User"},</div>
                    <div className="userDesignation">{this.state.userInfo?this.state.userInfo.designation:"Unknown Designation"}</div>
                </div>
                <div className="userPostDate">{this.state.created_at} </div>
                <div className="feedAnswer">
                    <div className="feedAnswerBefore">{this.state.beforeAnsDesc}</div>
                    <div className="feedAnswerMain">{this.state.solution}</div>
                    <div className="feedAnswerAfter">{this.state.afterAnsDesc}</div>
                </div>
                <div className="feedDetails">
                    <div className="upvote">
                        <div className="upvoteLogo" onClick={this.handleUpVote}><img src={upvoteLogo} alt="Upvote" /></div>
                        <div className="upvoteCount">{this.state.upvote}</div>
                        <div className="upvoteTitle">Upvote</div>
                    </div>
                    <div className="like">
                        <div className="likeLogo" onClick={this.handleAnswerLike}><img src={likeLogo} alt="Like" /></div>
                        <div className="likeCount">{this.state.like}</div>
                        <div className="likeTitle">Like</div>
                    </div>
                </div>
                <div className="addComment">
                    <input onChange={this.handleChangeComment.bind(this)} className="commentBar" type="text" name="commentBar" placeholder="Add a comments..." />
                    
                    <button onClick={this.openModal} >Post</button>
                </div>
                <div className="comments">
                    {
                        this.state.comments?this.state.comments.forEach((element=>{
                            commentData.push(<CommentSet commentData={element} questionData={this.state} />);
                        })):null 
                    }
                    {commentData}
                </div>
                <Popup open={this.state.open} closeOnDocumentClick onClose={this.closeModal}>
                    <div className="modal" style={{"display":"flex"}}>
                        <div className="popupUserInfo">
                        <a className="close" onClick={this.closeModal}>
                            &times;
                        </a>
                        <input onChange={this.handleName.bind(this)} className="nameBar" type="text" name="nameBar" placeholder="Add a Name..." />
                        <input onChange={this.handleDesignation.bind(this)} className="desigBar" type="text" name="desigBar" placeholder="Add a Designation..." /> 
                        <div className="popupUserInfo1" >
                            <button onClick={this.postComment}>Add</button>
                        </div>                   
                        </div>
                        
                    </div>
                </Popup>
            </div>
        );
    }
}

class CommentSet extends React.Component {

    constructor(props){
        super(props)
        this.state=props.commentData;
        this.state.questionData=props.questionData;
        this.handleCommentLike=this.handleCommentLike.bind(this);
    }

    async handleCommentLike(){
        let payload = {
            cid:this.state._id
        }

        const response = await fetch('http://localhost:3030/api/v1/nodes/engine/addCommentLike', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const json = await response.json();
        if (json.result._id) {
            toast.success("Comment liked");
        } else {
            toast.error("Failed to like");
        }
    }


    render() {
        return (
            <div className="commentSet">
                        <div className="commentUserDetails">

                            <div className="commentUserLogo"><img src={personLogo} alt="Person" /></div>
                        <div className="commentUserName">{this.state.userCommentInfo?this.state.userCommentInfo.username:"Unknown User"}, {this.state.userCommentInfo?this.state.userCommentInfo.designation:"Unknown Designation"}</div>
                        </div>
                        <div className="commentDesc">{this.state.title}</div>
                        <div className="commentLike">
                            <div className="commentLikeLogo" onClick={this.handleCommentLike}><img src={likeLogo} alt="Like" /></div>
                            <div className="commentLikeCount">{this.state.liked}</div>
                            <div className="commentLikeTitle">Like</div>
                        </div>
                    </div>
        );
    }
}

export default DetailedSolution;