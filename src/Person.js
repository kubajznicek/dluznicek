import React, { Component } from 'react'

class Person extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: ""
    };

  }

  render() {
    return <div>
        <div>
        </div>
        Jmeno: {this.props.name}
      </div>
  }
}

export default Person
