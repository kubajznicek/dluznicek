import React, { Component } from 'react'
import './App.css'
import Dluhy from './Dluhy'
import Clenove from './Clenove'
import Platby from './Platby'
import Person from './Person'

// let BASE_URL = "http://127.0.0.1:8000"   //development url
let BASE_URL = ""   //build url

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      people: [],
      platby: [],
      isowed: {},
      ows: {},
      debts: [],
      EUR: 0,
      USD: 0
    };
  }



  componentDidMount() {
    fetch(BASE_URL + '/people')
      .then((result) => result.json())
      .then((result) => {
        let ppl = this.state.people
        for (let index = 0; index < result.length; index++) {
          ppl.push(result[index])
        }
        this.setState({
          people: ppl
        })
      })

    fetch(BASE_URL + '/payments')
      .then((result) => result.json())
      .then((result) => {
        let payments = []
        for (let index = 0; index < result.length; index++) {
          payments.push(result[index])
        }
        this.setState({
          platby: payments
        })
      })

    fetch(BASE_URL + '/debts')
      .then((result) => result.json())
      .then((result) => {
        this.setState({
          isowed: result.isowed,
          ows: result.ows,
          debts: result.debts
        })
      })
      
    fetch(BASE_URL + '/currencies')
        .then((result) => result.json())
        .then((result) => {
          this.setState({
            EUR: result.eur,
            USD: result.usd
          })
        })
  }
  
  addPerson = (novejmeno) => {
    let ppl = this.state.people
    ppl.push(novejmeno)
    this.setState({
      people: ppl
    })
    fetch(BASE_URL + "/people", {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({person: novejmeno})
    })
  }

  removePerson = (odstranitJmeno) => {
    this.setState({people: this.state.people.filter(function(person) { 
      return person !== odstranitJmeno 
    })});

    fetch(BASE_URL + "/people", {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({person: odstranitJmeno})
    })
  }

  addPayment = (payment) => {
    this.setState(prevState => ({
      platby: [...prevState.platby, payment]
    }))
    fetch(BASE_URL + "/payments", {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payment)
    })
      .then((result) => result.json())
      .then((result) => {
        this.setState({
          isowed: result.isowed,
          ows: result.ows,
          debts: result.debts
        })
      })
  }

  removeDebts = () => {
    this.setState({
      debts: [],
      isowed: {},
      ows: {}
    })
    fetch(BASE_URL + "/debts", {
      method: 'DELETE'
    })
  }
  

  render() {
    
    const topPeople = this.state.people?.map((name) => <Person key={name} name={name} isowed={this.state.isowed[name]} ows={this.state.ows[name]}/>)
    
    return (
    <div className="vh-100">
      <div style={{height: '100px'}}>
        <div className="h-100 container-fluid d-flex justify-content-center align-items-center">
          <a className="text-decoration-none fs-1 text-color-primary fw-semibold" href='#'>Dlužníček</a>
        </div>
      </div>
      <div className="container-fluid" style={{height: '3px', backgroundColor :'#e2e4ed'}}></div>

      <div className="container-fluid d-flex flex-wrap justify-content-center align-items-center" style={{minHeight: '35%',backgroundColor : '#ffffff'}}>
        {topPeople}
      </div>
      
      <ul className="nav nav-tabs nav-justified" style={{backgroundColor : '#e2e4ed'}}>
          <li className="nav-item">
            <button className="nav-link active" id="transakce-tab" data-bs-toggle="tab" data-bs-target="#transakce-tab-pane" type="button" role="tab" aria-controls="transakce-tab-pane" aria-selected="true">Platby</button>
          </li>
          <li className="nav-item">
            <button className="nav-link" id="dluhy-tab" data-bs-toggle="tab" data-bs-target="#dluhy-tab-pane" type="button" role="tab" aria-controls="dluhy-tab-pane" aria-selected="false">Dluhy</button>
          </li>
          <li className="nav-item">
            <button className="nav-link" id="clenove-tab" data-bs-toggle="tab" data-bs-target="#clenove-tab-pane" type="button" role="tab" aria-controls="clenove-tab-pane" aria-selected="false">Členové</button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div className="tab-pane fade show active" id="transakce-tab-pane" role="tabpanel" aria-labelledby="transakce-tab" tabIndex="0"> <Platby people={this.state.people} platby={this.state.platby} addPaymentHandler={this.addPayment}/> </div>
          <div className="tab-pane fade" id="dluhy-tab-pane" role="tabpanel" aria-labelledby="dluhy-tab" tabIndex="0"> <Dluhy debts={this.state.debts} debtsHandler={this.removeDebts}/> </div>
          <div className="tab-pane fade" id="clenove-tab-pane" role="tabpanel" aria-labelledby="clenove-tab" tabIndex="0"> <Clenove people={this.state.people} addPersonHandler={this.addPerson} removePersonHandler={this.removePerson} isowed={this.state.isowed} ows={this.state.ows}/> </div>
        </div>

      <div style={{height: '120px'}}></div>

      <div className="fixed-bottom fs-3 d-flex align-items-center bg-primary justify-content-between" style={{height: '70px'}}>
        <div>
          <span className="badge rounded-pill bg-light text-dark ms-3">1 EUR = {this.state.EUR} CZK</span>
          <span className="badge rounded-pill bg-warning text-dark ms-3">1 USD = {this.state.USD} CZK</span>
        </div>
        <div>
          <a href='https://github.com/kubajznicek/dluznicek' target="_blank" rel="noreferrer" className='text-decoration-none d-flex align-item-center'>
            <img src="images/github.png" width="25" height="25" alt="github"/>
            <span className='ms-2 me-3 text-dark fs-5 mb-0'>Kubajznicek</span>
            </a>
        </div>
      </div>
    </div>
    )
  }
}

export default App
