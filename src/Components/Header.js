import React from 'react';
import '../App.css';
import './Header.css';

export default class Header extends React.Component {
    render(){
        return (
            <div className = 'navbar-style'>
                <h2 href="#home" className="title-big glow">IT'S LIT</h2>
            </div>
        )
    }
}