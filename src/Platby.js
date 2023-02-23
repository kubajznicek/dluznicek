import React, { Component } from "react";


class Platby extends Component {
  constructor(props) {
    super(props);

    this.state = {
      suma_display: 0,
      platby: [
        // {
          // whoPaid: "",
          // amount: 0,
          // purpose: "",
          // datum: new Date().toLocaleString().slice(0, 9).replaceAll("/","-"),
          // whomPaid:[]
        // }
      ],

    };
  }
  
  formChange = (e) => {
    
    if (this.state.suma_display !== 0, document.getElementById("sel1").value !== "Vyber člověka", document.getElementById("purpose").value !== "") {
      document.getElementById("ulozitButton").disabled = false
    }
    else{
      document.getElementById("ulozitButton").disabled = true
    }
  }

  addPayment = (e) => {

    let datum = document.getElementById("startDate").value

    if ( datum === "") {
      datum = new Date().toLocaleString().replaceAll("/","-").split(',')[0]
      datum = datum.split('-')
      datum = datum[1] + '-' + datum[0] + '-' + datum[2]
    }
    else {
      datum = datum.split('-').reverse().join('-')
    }


    let whomPaid = []

    document.querySelectorAll('[id=whomPaid]').forEach(element => {
      if (Number(element.lastChild.value) !== 0) {
        whomPaid.push(element.firstChild.textContent)
      }
    })

    this.setState(prevState => ({
      platby: [...prevState.platby, {whoPaid: document.getElementById("sel1").value, amount: this.state.suma_display, purpose: document.getElementById("purpose").value, datum: datum, whomPaid: whomPaid}],
      suma_display: 0
    }));
    
    document.getElementById("platbyForm").reset()
  }

  soucet = () => {
    let suma = 0
    document.querySelectorAll('[id=amount]').forEach(element => {
      suma += Number(element.value)
    })

    this.setState({
      suma_display: suma
    })
  }

  render() {

    const platbyRender = this.state.platby.map(function(platby, idx) {
      return ([
        <li className="list-group-item d-flex justify-content-between align-items-center" key={idx}>
          <div className="d-flex flex-column">
            <div className="d-flex align-items-baseline">
              <h4 className="text-capitalize me-2">{platby.purpose}</h4>
              <p className="m-0 blockquote-footer">{platby.datum}</p>
            </div>
            <div className="d-flex align-items-center">
              <img src="images/profile_picture.png" width="40" height="40" alt="profilový obrázek"/>
              <h5 className="my-0 ms-2 text-capitalize" >{platby.whoPaid}</h5>
            </div>
          </div>
          <div className="text-end">
            <span className="badge bg-primary rounded-pill">{platby.amount} CZK</span>
            <h5 className="text-capitalize mt-4">{platby.whomPaid + ""}</h5>
          </div>
        </li>
      ]);
    });

    const whomPaidPeople = this.props.people?.map((name) => {
      return (
        
        <div className="d-flex justify-content-between" id="whomPaid" key={name}>
          <h4 className="text-capitalize">{name}</h4> 
          <input type="number" pattern="[0-9]" inputMode="numeric" id="amount" className="form-control w-25" defaultValue={0} placeholder="Zadejte částku" onFocus={e => e.target.select()} onChange={this.soucet}/>
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
          {platbyRender}
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
                <form autoComplete="off" id="platbyForm">

                  {/*  onChange={this.formChange} */}

                  <h6 className="text-start">Kdo platil</h6>
                  <select className="form-select mb-4 text-capitalize" id="sel1">
                    <option>Vyber člověka</option>
                    {whoPaidPeople}
                  </select>

                  <h6 className="text-start">Za koho</h6>
                  <div className="d-flex flex-column mb-4">
                    {whomPaidPeople}
                  </div>


                  <div className="text-end">
                    <h6>{this.state.suma_display}</h6>
                  </div>

                  <h6 className="text-start">Za co</h6>
                  <input id="purpose" className="form-control mb-3" autoComplete="on" type="text" placeholder="Jaky byl ucel platby"/>

                  <div className="mb-5 text-start">
                    <h6 className="text-start">Datum</h6>
                    <input id="startDate" className="form-control" type="date"/>
                    <small className="text-muted ms-1">Pokud neudáte datum bude použito dnešní</small>
                  </div>
                  
                  {/* disabled={true} */}
                  <button type="button" className="btn btn-primary" id="ulozitButton" data-bs-dismiss="modal" onClick={this.addPayment}>Uložit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}

export default Platby ;
