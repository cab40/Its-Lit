import React from 'react';
import Header from './Header.js';
import {data} from './data.js';

import '../App.css';


class Gameplay extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        songs: data
      }
    }
    render (){
      return (
        <div className="App" style={{width:'100%', height:'100%'}}>
          <Header />
        </div>
      )
    }
  }
  
  export default Gameplay;