import React from 'react';
import '../App.css';
import {Link } from "react-router-dom";
import Header from '../Header/header';
import solvedTag from '../assests/images/solved.png';
import unsolvedTag from '../assests/images/unsolved.png';
import Config from '../Config/config';

let baseUrl = Config.protocol+"://"+Config.host+":"+Config.port;

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
            searchResult:'',
            flag:'All',
            solvedCss:'',
            unsolvedCss:'',
            allCss:'solutionFilterItemClicked'
        }
        this.handleButtonFilter =this.handleButtonFilter.bind(this);
        
    }
    componentWillMount(){
        console.log(" componentWillMount");
        this.fetchData();
    }
    fetchData = async () => {
        await fetch(baseUrl+''+Config.search)
            .then(response => response.json())
            .then(json => this.setState({ searchResult:json})) 
    };

    async filterQuestionList(event){
        await fetch(baseUrl+''+Config.search+'?name='+event.target.value)
            .then(response => response.json())
            .then(json => this.setState({ searchResult:json}))
    }
    handleButtonFilter(e){
        //alert(e.target.name)
        if(e.target.name=='All'){
            this.setState({
                flag:e.target.name,
                allCss:"solutionFilterItemClicked",
                solvedCss:'',
                unsolvedCss:''
            });
        }else if(e.target.name=='Solved'){
            this.setState({
                flag:e.target.name,
                allCss:"",
                solvedCss:'solutionFilterItemClicked',
                unsolvedCss:''
            });
        }else if(e.target.name=='Unsolved'){
            this.setState({
                flag:e.target.name,
                allCss:"",
                solvedCss:'',
                unsolvedCss:'solutionFilterItemClicked'
            });
        }
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
                <div className="solutionFilterMenu">
                    <label className="solutionFilterTitle">Filter :</label>
                    <div className="solutionFilterList">
                        <button className={"solutionFilterItem"+" "+this.state.allCss} name="All" onClick={this.handleButtonFilter}>All</button>
                        <button className={"solutionFilterItem"+" "+this.state.solvedCss} name="Solved" onClick={this.handleButtonFilter}>Solved</button>
                        <button className={"solutionFilterItem"+" "+this.state.unsolvedCss} name="Unsolved" onClick={this.handleButtonFilter}>Unsolved</button>
                    </div>
                </div>
                {data?data.forEach(element => {
                    if(this.state.flag=='All'){
                        SolutionSetData.push(<SolutionSet innerData={element} flag={this.state.flag} />) 
                    }else if(this.state.flag=='Solved'){
                        if(element.answer.length>0){
                            SolutionSetData.push(<SolutionSet innerData={element} flag={this.state.flag} />)
                        } 
                    }else if(this.state.flag=='Unsolved'){
                        if(element.answer.length==0){
                            SolutionSetData.push(<SolutionSet innerData={element} flag={this.state.flag} />) 
                        }
                    }
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
            innerData:props.innerData,
            flag:props.flag
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