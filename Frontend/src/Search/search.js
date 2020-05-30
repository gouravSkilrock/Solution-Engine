import React from 'react';
import '../App.css';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../Header/header';
import { Redirect } from 'react-router';

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      redirect:false,
      loginData:props.location.loginData
    }
    this.handleSearch = this.handleSearch.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
  }

  handleSearch() {
    if (this.state.search==="") {
      toast.error("Search field can't be empty!");
    }else{
      this.setState({
        redirect:true
      });
   }
  }

  getSearchValue(e) {
    this.setState({
      search: e.target.value
    });
  }
  
  _handleKeyDown(e){
    if (e.key === 'Enter') {
     if(this.state.search===""){
        toast.error("Search field can't be empty!");
     }else{
        this.setState({
          redirect:true
        });
     }  
    }
  }

  render() {
    if(this.state.redirect){
      return <Redirect push to={{pathname:`/searchSolution/${this.state.search}`,loginData:this.state.loginData}}></Redirect>
    }
    return (
      <div>
        <Header/>
        <div className="searchPage">
          <ToastContainer position={toast.POSITION.TOP_RIGHT} />
          <input className="searchBar" type="text" name="search" onChange={this.getSearchValue.bind(this)} placeholder="Search..."   onKeyDown={this._handleKeyDown} />
          <div className="searchButtonDiv">
              <button className="searchButton" onClick={this.handleSearch}>Search</button>

            <Link to={{pathname:`/addQuestion`,loginData:this.state.loginData}}>
              <button className="searchButton">Add Question</button>
            </Link>

            <Link to={{pathname:`/questionList`,loginData:this.state.loginData}}>
              <button className="searchButton">Add Answer</button>
            </Link>

            <Link to={{pathname:`/userWiseReport`,loginData:this.state.loginData}}>
              <button className="searchButton">User Wise Reports</button>
            </Link>



          </div>
        </div>
      </div>
    );
  }
}

export default Search;
