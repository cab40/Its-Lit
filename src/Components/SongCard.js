import React, {Component} from "react";
import { Button, Row} from "reactstrap";
import { Rating } from 'react-simple-star-rating';

class Star extends Component {
    render(){
        return(
            <i class="fas fa-star"></i>
        )
    }
}

export default class SongCard extends Component {
    constructor(props){
        super(props);
    }

    onClick = () => {
        console.log("HI");
    }

    render(){
        return(
            <div style={{backgroundColor: "#1D2442", borderRadius: '0px', borderWidth: "0px", padding: "0px", width: '100%', height: '100%', alignItems: 'center', justifyContent: "center"}}>
                <img style={{width: "90%", height: "70%", margin: '0px auto'}} src={this.props.img_url}/>
                <div style={{color: 'white', fontSize: "25px"}}>
                    {this.props.title}
                </div>
                <div style={{color: 'white', fontSize: '15px'}}>
                    {this.props.artist}
                </div>
                <Button style={{marginTop: "10px", backgroundColor: "#5474E1", color: 'white', width: "150px"}}>
                    Play
                </Button>
                <div>
                    <Rating ratingValue={this.props.stars} stars={3}/>
                </div>
            </div>
        )
    }
}