import React, {Component} from "react";
import { Button, Row} from "reactstrap";
import { Rating } from 'react-simple-star-rating';
import {Link} from "react-router-dom";

export default class SongCard extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className = "songCard-style">
                <img style={{width: "", height: "70%", margin: '0px auto', borderRadius:'10px 10px 0 0'}} src={this.props.img_url}/>
                <div style={{color: 'white', fontSize: "25px"}}>
                    {this.props.title}
                </div>
                <div style={{color: 'white', fontSize: '15px', marginBottom: '15px'}}>
                    {this.props.artist}
                </div>
                <Link style={{marginTop: "30px", backgroundColor: "#5474E1", color: 'white', width: "150px", textDecoration: 'none', borderRadius: "10px", padding: "2px 30px"}} to="/gameplay">
                    Play
                </Link>
                <div style={{marginTop: '10px'}}>
                    <Rating ratingValue={this.props.stars} stars={3}/>
                </div>
            </div>
        )
    }
}