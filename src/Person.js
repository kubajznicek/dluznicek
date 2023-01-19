import React, { Component } from "react";

class Person extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
    };
  }

  render() {
    return (
      <div>
        <div className="card bg-light my-3 ms-3" style={{ width: "13rem" }}>
          <img src="images/penizky_malo.png" className="card-img-top img-thumbnail" alt="hromadka penez"/>
          <div className="card-body bg-primary">
            <h4 className="text-center text-light text-capitalize">{this.props.name}</h4>
            <p className="card-text text-center text-light">-485 kc</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Person;
