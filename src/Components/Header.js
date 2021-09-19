import React from 'react';
import './Header.css';
import {Link} from "react-router-dom";

export default class Header extends React.Component {
    render(){
        return (
            <Link to="/" style={{textDecoration: "none"}}>
                <div className = 'navbar-style'>
                    <h2 href="#home">PIANO TILES</h2>
                </div>
            </Link>
        )
    }
}