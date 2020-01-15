import React from 'react';
import '../App.css';
import {Link } from "react-router-dom";
import Header from '../Header/header';

class QuestionList extends React.Component {

        render() {
            return  (
                 <div>
                     <Header />
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
        this.fetchData();
    }
    fetchData = async () => {
        fetch('http://localhost:3030/api/v1/nodes/engine/search')
            .then(response => response.json())
            .then(json => this.setState({ searchResult:json}))
    };

    render() {
        console.log(this.state.searchResult);
        let data = this.state.searchResult.result;
        let SolutionSetData = [];
        return (
            <div className="solutionCluster">
                {data?data.forEach(element => {
                    SolutionSetData.push(<SolutionSet innerData={element} />) 
                }):null}    
            {SolutionSetData}

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
        return (
            <div className="solutionSet">
                        <Link to={`/detailedSolution/${this.state.innerData._id}`}>
                            <div className="solutionTitle">{this.state.innerData.question}</div>
                        </Link>
                    </div>
        );
    }
}
export default QuestionList;