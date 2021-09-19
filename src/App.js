import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Header from './Components/Header.js';
import Cards from './Components/Cards.js';
import {data} from './Components/data.js'
import SongCarousel from './Components/SongCarousel.js';
import Gameplay from './Components/Gameplay';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      songs: data,
      activePage: 'homepage',
    }
  }
  render (){
    return (
      <Router>
        <div className="App" style={{width:'100%', height:'100%'}}>
          <Header />
          {/*<div style={{height: "50px"}}/>*/}
          <Switch style={{width: "100%", height: "100%"}}>
          <Route path="/gameplay">
            <Gameplay/>
          </Route>
          <Route path="/">
            <SongCarousel style={{height: "50%"}}/>
          </Route>
        </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
