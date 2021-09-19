import React from 'react';
import Header from './Header.js';
import {data} from './data.js';
import {Redirect, Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';


import '../App.css';


class Gameplay extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        //score variable?
        //image: 'https://upload.wikimedia.org/wikipedia/en/7/70/Graduation_%28album%29.jpg',
        image: 'https://upload.wikimedia.org/wikipedia/en/1/1e/Cage_the_Elephant_Melophobia.jpg',
        song: 'Cigarette Daydreams',
        artist: 'Cage the Elephant',
        length: '3:28'
      }
    }

    onSubmit = () => {
        return <Redirect to="../App"/>
    }

    render (){
        return (
            <div className="App" style={{width:'100%', height:'100%'}}>
            <Header />
            <div className="col">
                <h1 className="glow title">SCORE:</h1>
                <h1 className="glow-pi title-big" style={{fontSize:'9rem', padding:'1rem'}}>{'69%'}</h1>
                <div className="row musicCard">
                    <div className="col">
                        <img src={this.state.image} style={{width:'110%', height:'100%', objectFit:'cover', borderRadius:'8px', margin:'0px auto', marginLeft:'-20px'}}></img>
                    </div>
                    <div className="col-10">
                        <div className="row">
                            <div className="col t-white" style={{textAlign:'left'}}>0:00</div>
                            <div className="col t-white" style={{textAlign:'right'}}>{this.state.length}</div>
                        </div>
                        <div className="row t-white"><div className="col" style={{paddingBottom: '5%', paddingTop: '5%'}}>time bar goes here</div></div>
                        <div className="row t-white" style={{textAlign:'center'}}>
                            <h3 className="col t-white" style={{textAlign:'left'}}>{this.state.song} - {this.state.artist}</h3>
                            <div className="col-4">
                                <Button onClick={this.onSubmit} className='t-white' size='m' style={{marginLeft:'70%', width:'100px', backgroundColor:'#5474E1'}}>Stop</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
  }
  
  export default Gameplay;