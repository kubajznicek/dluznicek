import React, { Component } from 'react'

class Header extends Component {

  constructor(props) {
    super(props);

    this.state = {
    };

  }


  render() {
    return <div style={{height: '100px'}}>
      <div className="h-100 container-fluid bg-primary d-flex justify-content-center align-items-center">
        <a className="text-light text-decoration-none fs-1" href="#">Dlužníček</a>
      </div>
    </div>
  }
}

export default Header
