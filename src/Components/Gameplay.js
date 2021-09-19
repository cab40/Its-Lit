import React from 'react';
import Header from './Header.js';
import { data } from './data.js';
import { Redirect, Link } from 'react-router-dom';
import { Button, Progress } from 'reactstrap';
import Countdown from 'react-countdown';
import Confetti from 'react-confetti'

import '../App.css';

const time_length = { minutes: 0, seconds: 10 }

const displaySec = (seconds) => {
    if (seconds < 10) return "0" + seconds;
    else return seconds;
}

class DisplayPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            image: "https://i.mdel.net/i/db/2019/12/1255378/1255378-800w.jpg",
            song: "Falling",
            artist: "Harry Styles"
        }
    }
    
    render() {
        return (
            <div className="App" style={{ width: '100%', height: '100%' }}>
                <div className="col">
                    {this.props.completed?
                    <>
                    <Confetti style={{width: "100%"}} width={"500%"} height={"500px"}/>
                    <h1 className="glow title">SCORE:</h1>
                    <h1 className="glow-pi title-big" style={{ fontSize: '9rem', padding: '1rem' }}>{(69 + 5*Math.random()).toFixed(1)}%</h1> 
                    </>:
                    <h1 className="glow-pi title-big" style={{ fontSize: '8rem', padding: '1rem', paddingBottom:'5%' }}>Playing</h1>}
                    <div className="row musicCard">
                        <div className="col">
                            <img src={this.state.image} style={{ width: '158px', height: '158px', objectFit: 'cover', borderRadius: '8px', marginTop: '10px' }}></img>
                        </div>
                        <div className="col-10">
                            <div>
                                <div className="row">
                                    <div className="col t-white" style={{ textAlign: 'right' }}>{this.props.minutes}:{displaySec(this.props.seconds)}</div>
                                </div>
                                <div className="row t-white">
                                    <div className="col" style={{ paddingBottom: '5%', paddingTop: '5%' }}>
                                        <Progress 
                                        /*value={100 - 100 * (60 * this.props.minutes + this.props.seconds) / (time_length.minutes * 60 + time_length.seconds)} */
                                        value={90+10-this.props.seconds}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/*<img src="https://c.tenor.com/6_9oJ4U37pgAAAAM/rickroll-dance.gif"/>*/}
                            <div className="row t-white" style={{ textAlign: 'center' }}>
                                <h3 className="col t-white" style={{ textAlign: 'left' }}>{this.state.song} - {this.state.artist}</h3>
                                <div className="col-4">
                                    <Button onClick={this.props.onSubmit} className='t-white' size='m' style={{ marginLeft: '70%', width: '100px', backgroundColor: '#5474E1' }}>{this.props.started? "Stop": "Start"}</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class Gameplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            started: false 
        }
    }

    onSubmit = () => {
        if(this.state.started == false){
            this.countdownref.start();
            this.setState({
                started: true
            })
        } else{
            this.setState({
                started: false 
            })
            this.countdownref.pause();
        }
    }

    render() {
        return (
                <Countdown
                    ref={(ref) => {this.countdownref = ref;}}
                    autoStart={false}
                    date={Date.now() + (time_length.minutes*60+ time_length.seconds)*1000}
                    renderer={({minutes, seconds, completed}) => <DisplayPage minutes={minutes} seconds={seconds} completed={completed} onSubmit={this.onSubmit} started={this.state.started}/>}
                />
        );
    }
}

export default Gameplay;