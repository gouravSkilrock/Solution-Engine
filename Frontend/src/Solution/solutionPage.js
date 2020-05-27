import React from 'react';
import '../App.css';
import {Link } from "react-router-dom";
import Logo from '../assests/images/SolutionEngine_Logo-3.jpg';
import Header from '../Header/header';


class SolutionPage extends React.Component {
             
    constructor(props){
        super(props);
        this.state = {
            searchId : this.props.match.params.searchId,
            loginData:props.location.loginData
        }
    }
        render() {
           return  (
                <div>
                    <Header/>
                    <SolutionCluster data={this.state} />
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
        fetch('http://localhost:3030/api/v1/nodes/engine/search?name='+this.props.data.searchId)
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
        let solutionDescData = [];
        return (
            <div className="solutionSet">
                        <Link to={`/detailedSolution/${this.state.innerData._id}`}>
                            <div className="solutionTitle">{this.state.innerData.question}</div>
                        </Link>
                        {
                            (this.state.innerData.answer)?
                            this.state.innerData.answer.forEach(element => {
                                solutionDescData.push(<div className="solutionDesc">{element.beforeAnsDesc}</div> )
                            })
                            :null
                        }
                        {solutionDescData}
                        <Link to={`/detailedSolution/${this.state.innerData._id}`}>
                            <div className="solutionMore">(more...)</div>
                        </Link>
                    </div>
        );
    }
}

export default SolutionPage;
