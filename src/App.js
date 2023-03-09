import React, { Component } from 'react'
import './App.css'
import Dluhy from './Dluhy'
import Clenove from './Clenove'
import Platby from './Platby'
import Person from './Person'


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      people: [],
      isowed: {},
      ows: {},
      debts: [],
      EUR: 0,
      USD: 0
    };
  }

  
  componentDidMount() {
    fetch('http://127.0.0.1:8000/people')
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

    fetch('http://127.0.0.1:8000/debts')
      .then((result) => result.json())
      .then((result) => {
        this.setState({
          isowed: result.isowed,
          ows: result.ows,
          debts: result.debts
        })
      })
      
    fetch('http://127.0.0.1:8000/currencies')
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
    fetch("http://127.0.0.1:8000/people", {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({person: novejmeno})
    })
  }

  removePerson = (odstranitJmeno) => {
    this.setState({people: this.state.people.filter(function(person) { 
      return person !== odstranitJmeno 
    })});

    fetch("http://127.0.0.1:8000/people", {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({person: odstranitJmeno})
    })
  }

  addPayment = (payment) => {
    fetch("http://127.0.0.1:8000/payments", {
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
    fetch("http://127.0.0.1:8000/debts", {
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

      <div className="container-fluid d-flex flex-wrap justify-content-center align-items-center" style={{minHeight: '25%',backgroundColor : '#ffffff'}}>
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
          <div className="tab-pane fade show active" id="transakce-tab-pane" role="tabpanel" aria-labelledby="transakce-tab" tabIndex="0"> <Platby people={this.state.people} addPaymentHandler={this.addPayment}/> </div>
          <div className="tab-pane fade" id="dluhy-tab-pane" role="tabpanel" aria-labelledby="dluhy-tab" tabIndex="0"> <Dluhy debts={this.state.debts} debtsHandler={this.removeDebts}/> </div>
          <div className="tab-pane fade" id="clenove-tab-pane" role="tabpanel" aria-labelledby="clenove-tab" tabIndex="0"> <Clenove people={this.state.people} addPersonHandler={this.addPerson} removePersonHandler={this.removePerson} /> </div>
        </div>

      <div style={{height: '120px'}}></div>

      <div className="fixed-bottom fs-3 d-flex align-items-center bg-primary" style={{height: '70px'}}>
        <span className="badge rounded-pill bg-light text-dark ms-3">1 EUR = {this.state.EUR} CZK</span>
        <span className="badge rounded-pill bg-warning text-dark ms-3">1 USD = {this.state.USD} CZK</span>
      </div>
    </div>
    )
  }
}

export default App
