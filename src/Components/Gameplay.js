import React from 'react';
import Header from './Header.js';
import { data } from './data.js';
import { Redirect, Link } from 'react-router-dom';
import { Button, Progress } from 'reactstrap';
import Countdown from 'react-countdown';

import '../App.css';

const time_length = { minutes: 2, seconds: 47 }

const displaySec = (seconds) => {
    if (seconds < 10) return "0" + seconds;
    else return seconds;
}

class DisplayPage extends React.Component {
    constructor(props){
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
    render() {
        return (
            <div className="App" style={{ width: '100%', height: '100%' }}>
                <div className="col">
                    <h1 className="glow title">SCORE:</h1>
                    <h1 className="glow-pi title-big" style={{ fontSize: '9rem', padding: '1rem' }}>{(69 + Math.random()).toFixed(1)}%</h1>
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
                                        <Progress value={100 - 100 * (60 * this.props.minutes + this.props.seconds) / (time_length.minutes * 60 + time_length.seconds)} />
                                    </div>
                                </div>
                            </div>
                            {/*<img src="https://c.tenor.com/6_9oJ4U37pgAAAAM/rickroll-dance.gif"/>*/}
                            <div className="row t-white" style={{ textAlign: 'center' }}>
                                <h3 className="col t-white" style={{ textAlign: 'left' }}>{this.state.song} - {this.state.artist}</h3>
                                <div className="col-4">
                                    <Button onClick={this.onSubmit} className='t-white' size='m' style={{ marginLeft: '70%', width: '100px', backgroundColor: '#5474E1' }}>Stop</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const renderer = ({ minutes, seconds }) => {
    return (
        <DisplayPage minutes={minutes} seconds={seconds}/>
    );
};

class Gameplay extends React.Component {
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
        return <Redirect to="../App" />
    }

    render() {
        return (
                <Countdown
                    date={Date.now() + 5000}
                    renderer={renderer}
                />
        );
    }
}

export default Gameplay;