import React from 'react';
import './App.css';
import SearchEngine from './searchEngine';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import SolutionPage from './Solution/solutionPage';
import DetailedSolution from './Solution/DetailedSolution';
import AddQuestion from './Question/addQuestion';
import QuestionList from './Answer/questionList';


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/"><SearchEngine/></Route>
          <Route  path="/searchSolution/:searchId" component={SolutionPage}></Route>
          <Route exact path="/detailedSolution/:questionId" component={DetailedSolution}></Route>
          <Route exact path="/addQuestion/" component={AddQuestion}></Route>
          <Route exact path="/questionList" component={QuestionList}></Route>
        </Switch>
      </div>
    </Router>


  );
}

export default App;
