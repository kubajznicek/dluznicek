import React, { Component } from "react";

class Person extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dluzi: 50,
    };
  }

  penizkyImage() {
    if (this.state.dluzi === 0) {

    }

    if (this.state.dluzi < 300) {
        return <img src="images/penizky_malo.png" width="85" height="98" alt="mala hromadka penez"/>
    }

    if (this.state.dluzi > 300, this.state.dluzi < 500) {
        return <img src="images/penizky_stredne.png" width="186" height="194" alt="stredni hromadka penez"/>
    }

    if (this.state.dluzi > 500) {
        return <img src="images/penizky_hodne.png" width="257" height="195" alt="velka hromadka penez"/>
    }
  }

  render() {
    return (
      <div key={this.props.name}>
        <div className="card bg-light mx-1" style={{ width: "15rem" }}>
        <div className="d-flex justify-content-center align-items-end bg-white" style={{ height: "200px" }}>
            {this.penizkyImage()}
        </div>
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