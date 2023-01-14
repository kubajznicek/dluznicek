import React, { Component } from 'react'
import './Header.css'

class Header extends Component {

  constructor(props) {
    super(props);

    this.state = {
    };

  }


  render() {
    return <div className="Header">
        <img src="images/hamburger_menu.png" alt="hamburger menu"/>
        <h1>Dluznicek</h1>
      </div>
  }
}

export default Header
