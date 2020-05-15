import React from 'react';
import './App.css';
import Search from './Search/search';
import Login from './login/login';

class SearchEngine extends React.Component {
    
    
    render() {
      return (
          <div className="SearchEngine">
          <Search/>
          {/* <Login/> */}
          </div>
      );
    }
  }

export default SearchEngine;
