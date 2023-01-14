import React, { Component } from 'react'
import './Person.css'

class Person extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: ""
    };

  }

  render() {
    return <div>Jmeno: {this.props.name}</div>
  }
}

export default Person
