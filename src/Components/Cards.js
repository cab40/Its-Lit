import React, {Component} from 'react';
import './cardStyle.css';
import { Media } from 'reactstrap';

var imgStyle = {
    minWidth: "128px",
  };

class Cards extends React.Component {
    constructor(props){
        super(props);

        this.state={};
    }
    
    render(){
        const cards = this.props.songs.map((song) => {
            return(
				<div key={song.id} id="unit" className="col-12 mt-5 card-style">					
					<Media tag="li">
						<Media left>
							<Media object data-src = {song.image} alt={song.song} />
						</Media>
						<Media body className="ml-3">
							<Media heading><strong>{song.song}</strong></Media>
							<div><strong>Artist - </strong>{song.artist}</div>
                            <a href="#" className='btn btn-outline-success'>Play</a>
						</Media>
					</Media>
				</div>
			); 
        });
        return(
			<div className="container">
				<div className="row">
					<Media list>
						{cards}
					</Media>
				</div>
			</div>
		);
    }
}

export default Cards;