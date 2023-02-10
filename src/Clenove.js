import React, { Component } from "react";

class Clenove extends Component {

  constructor(props) {
    super(props);

    this.state = {
      novejmeno: "",
    };
  }

  nameChange = (e) => {
    this.setState({
      novejmeno: e.target.value
    })
  }

  addPerson () {
    this.props.addPersonHandler(this.state.novejmeno) 
  }

  resetInput () {
    document.getElementById("novejmeno").value = ""
    this.setState({
      novejmeno: ""
    })
  }



  render() {

    const clenove = this.props.people?.map((name) => {
      return ( 
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <img src="images/profile_picture.png" width="40" height="40" alt="profilový obrázek"/>
              <h5 className="my-0 ms-2" >{name}</h5>
            </div>
            <span className="badge bg-primary rounded-pill">-104 CZK (kolik dluzi/kolik zaplatil za ostatni a jeste mu nebylo vraceno) </span>
          </li>
      )
    });

    return (
      <div>
        <br></br>
        <ul className="list-group d-grid col-6 mx-auto">
          {clenove}
        </ul>
        <br></br>

        <div className="d-grid col-3 mx-auto">
          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#PridatClenaOkno" onClick={() => this.resetInput()}>
            Přidat člena
          </button>
        </div>


        <div className="modal fade" id="PridatClenaOkno" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Přidat člena</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body text-center">
                <input type="text" id="novejmeno" className="form-control" placeholder="Nový člen do týmu" onChange={this.nameChange}/>
                <br></br>
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => this.addPerson()}>Uložit</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Clenove;
