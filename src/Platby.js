import React, { Component } from "react";

class Platby extends Component {
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
            <span className="badge bg-primary rounded-pill">-104 CZK</span>
          </li>
        </ul>
        <br></br>

        
        <div className="d-grid col-3 mx-auto">
          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#PridatPlatbuOkno">
            Přidat platbu
          </button>
        </div>


        <div className="modal fade" id="PridatPlatbuOkno" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Přidat platbu</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body text-center">
                <input type="text" id="novejmeno" className="form-control" placeholder="Nový člen do týmu"/>
                <br></br>
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Přidej platbu</button>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}

export default Platby ;
