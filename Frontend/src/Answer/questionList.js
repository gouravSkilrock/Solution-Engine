import React from 'react';
import '../App.css';
import {Link } from "react-router-dom";
import Header from '../Header/header';
import solvedTag from '../assests/images/solved.png';
import unsolvedTag from '../assests/images/unsolved.png';


class QuestionList extends React.Component {



        render() {
            return  (
                 <div>
                     <Header isSearchBarRequired={false} />
                     <SolutionCluster/>
                 </div>
             );
         }
}


class SolutionCluster extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            searchResult:''
        }
        
    }
    componentWillMount(){
        console.log(" componentWillMount");
        this.fetchData();
    }
    fetchData = async () => {
        await fetch('http://localhost:3030/api/v1/nodes/engine/search')
            .then(response => response.json())
            .then(json => this.setState({ searchResult:json})) 
    };

    async filterQuestionList(event){
        await fetch('http://localhost:3030/api/v1/nodes/engine/search?name='+event.target.value)
            .then(response => response.json())
            .then(json => this.setState({ searchResult:json}))
    }

    render() {
        let data = this.state.searchResult.result;
        let SolutionSetData = [];
        return (
            <div>
                <div className="answer-header-right" onChange={this.filterQuestionList.bind(this)}>
                            <input className="searchBar_logo" type="text" name="search" placeholder="Search..." />
                </div>

                <div className="solutionCluster">
                {data?data.forEach(element => {
                    SolutionSetData.push(<SolutionSet innerData={element} />) 
                }):"No result found!"}    
                {SolutionSetData}

            </div>


            </div>
            
            
        );
    }
}


class SolutionSet extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            innerData:props.innerData
        }

    }
    render() {
        console.log("Inner Data -",this.props);
        return (
            <div className="solutionSet">
                        <Link to={`/detailedSolution/${this.props.innerData._id}`}>
                            <div className="solutionTitle">{this.props.innerData.question}
                            {this.props.innerData.answer.length>0? <img src={solvedTag} style={{width: "5%"}} alt="solved-answer"/>: <img src={unsolvedTag} style={{width: "5%"}} alt="unsolved-answer"/>}
                            </div>
                        </Link>
                    </div>
        );
    }
}
export default QuestionList;