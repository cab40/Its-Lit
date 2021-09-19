import React from 'react';
import '../App.css';
import './Header.css';
import {Link} from "react-router-dom";

export default class Header extends React.Component {
    render(){
        return (
            <Link to="/" style={{textDecoration: "none"}}>
                <div className = 'navbar-style'>
                    <h2 href="#home" className="title-big glow">IT'S LIT</h2>
                    <div className="pls"></div>
                </div>
            </Link>
        )
    }
}