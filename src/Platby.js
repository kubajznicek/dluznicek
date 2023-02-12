import React, { Component } from "react";


class Platby extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paidPerson: this.props.people[0],
      datum: new Date().toLocaleString().slice(0, 8).replaceAll("/","-")

    };
  }

  dateChange = (e) => {
    this.setState({
      datum: e.target.value
    })
  }

  ulozitHandler = (e) => {
    const kdoPlatil = document.getElementById("sel1").value
  }

  render() {

    const whomPaidPeople = this.props.people?.map((name) => {
      return (
        
          <div className="d-flex justify-content-between" key={name}>
            <h4 className="text-capitalize">{name}</h4> 
            <input type="number" className="form-control w-25" defaultValue={0} placeholder="Zadejte částku"/>
          </div>

    );
  });

  const whoPaidPeople = this.props.people?.map((name) => {
    return ( 
        <option className="text-capitalize" key={name}>{name}</option>     
    )
  });

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


        <div className="modal fade" id="PridatPlatbuOkno" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">

              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Přidat platbu</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              <div className="modal-body text-center">
                <h6 className="text-start">Kdo platil</h6>
                <select className="form-select mb-4" id="sel1">
                  <option>Vyber člověka</option>
                  {whoPaidPeople}
                </select>

                <h6 className="text-start">Za koho</h6>
                <div className="d-flex flex-column mb-4">
                  {whomPaidPeople}
                </div>
                <h6 className="text-start">Datum</h6>
                <input id="startDate" className="form-control mb-5" type="date" onChange={this.dateChange}/>
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={this.ulozitHandler}>Uložit</button>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}

export default Platby ;
