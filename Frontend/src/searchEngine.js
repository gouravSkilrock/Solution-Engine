import React from 'react';
import './App.css';
import Search from './Search/search';

class SearchEngine extends React.Component {
    
    
    render() {
      return (
          <div className="SearchEngine">
          <Search/>
          </div>
      );
    }
  }

export default SearchEngine;
