import React, { Component } from "react";

class Dluhy extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
    };
  }

  render() {
    return (
      <div>
        <br></br>
        <ul className="list-group d-grid col-6 mx-auto">
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <img src="images/profile_picture.png" width="40" height="40" alt="profilový obrázek"/>
              <h5 className="my-0 ms-2" >Jarda</h5>
            </div>
            <div className="d-flex align-items-center gap-3">
              <span className="text-danger">104 CZK</span>
              <img src="images/sipka.png" width="25" height="25" alt="profilový obrázek"/>
            </div>
            <div className="d-flex align-items-center">
              <h5 className="my-0 me-2" >Jarda</h5>
              <img src="images/profile_picture.png" width="40" height="40" alt="profilový obrázek"/>
            </div>
          </li>
        </ul>
        <br></br>

        <div className="d-grid col-3 mx-auto">
          <button type="button" className="btn btn-primary">
            Splatit dluhy
          </button>
        </div>

      </div>
    )
  }
}

export default Dluhy;
