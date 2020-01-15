import React from 'react';
import '../App.css';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../Header/header';

class Search extends React.Component {

  state = {
    search: ''
  }

  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch() {
    if (this.state.search && this.state.search === '') {
      toast.error("Search field can't be empty!");
    }
  }

  getSearchValue(e) {
    this.setState({
      search: e.target.value
    });
  }

  render() {
    return (
      <div>
        <Header/>
        <div className="searchPage">
          <ToastContainer position={toast.POSITION.TOP_RIGHT} />
          <input className="searchBar" type="text" name="search" onChange={this.getSearchValue.bind(this)} placeholder="Search..." />
          <div className="searchButtonDiv">
            <Link to={`/searchSolution/${this.state.search}`}>
              <button className="searchButton" onClick={this.handleSearch}>Search</button>
            </Link>

            <Link to={`/addQuestion`}>
              <button className="searchButton">Add Question</button>
            </Link>

            <Link to={`/questionList`}>
              <button className="searchButton">Add Answer</button>
            </Link>



          </div>
        </div>
      </div>
    );
  }
}

export default Search;
