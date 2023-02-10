import React, { Component } from 'react'
import './App.css'
import Person from './Person'
import Dluhy from './Dluhy'
import Clenove from './Clenove'
import Platby from './Platby'


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      nakejtext: "zatim nic",
      people: ["jarda"],
    };

  }

  addPerson = (novejmeno) => {
    let ppl = this.state.people
    ppl.push(novejmeno)
    this.setState({
      people: ppl
    })
  }
  

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then((result) => result.json())
      .then((result) => {
        this.setState({
          nakejtext: result.title
        })
      })
  }


  render() {
    
    const topPeople = this.state.people.map((name) => <Person key={name} name={name}/>);
    
    return <div className="vh-100">
      <div style={{height: '100px'}}>
        <div className="h-100 container-fluid d-flex justify-content-center align-items-center">
          <a className="text-decoration-none fs-1 text-color-primary fw-semibold"href="#">Dlužníček</a>
        </div>
      </div>
      <div className="container-fluid" style={{height: '3px', backgroundColor :'#e2e4ed'}}></div>

      <div className="container-fluid d-flex flex-wrap justify-content-center align-items-center" style={{minHeight: '25%',backgroundColor : '#ffffff'}}>
        {topPeople}
      </div>
      
        {/*text-capitalize*/}
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
          <div className="tab-pane fade show active" id="transakce-tab-pane" role="tabpanel" aria-labelledby="transakce-tab" tabindex="0"> <Platby people={this.state.people}/> </div>
          <div className="tab-pane fade" id="dluhy-tab-pane" role="tabpanel" aria-labelledby="dluhy-tab" tabindex="0"> <Dluhy /> </div>
          <div className="tab-pane fade" id="clenove-tab-pane" role="tabpanel" aria-labelledby="clenove-tab" tabindex="0"> <Clenove people={this.state.people} addPersonHandler={this.addPerson} /> </div>
        </div>
      
      <div>{this.state.nakejtext}</div>

      <div className="fixed-bottom fs-3 d-flex align-items-center" style={{height: '70px', backgroundColor : '#0011b5'}}>
        <span className="badge rounded-pill bg-light text-dark ms-3">1 EUR = 24 CZK</span>
        <span className="badge rounded-pill bg-warning text-dark ms-3">1 USD = 22 CZK</span>
      </div>
    </div>
  }
}

export default App
