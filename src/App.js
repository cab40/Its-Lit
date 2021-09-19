import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import React from 'react';
import Header from './Components/Header.js';
import Cards from './Components/Cards.js';
import {data} from './Components/data.js'
import SongCarousel from './Components/SongCarousel.js';


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
      <div className="App" style={{width:'100%', height:'100%'}}>
        <Header />
        <div style={{height: "50px"}}/>
        <div className = 'row'>
          {/*<Cards songs={this.state.songs}/>*/}
          <SongCarousel style={{height: "50%"}}/>
        </div>
      </div>
    )
  }
}

export default App;
