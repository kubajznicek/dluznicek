import React, { Component } from 'react'
import './App.css'
import Header from './Header'
import Person from './Person'


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      nakejtext: "zatim nic",
      people: [],
      tabs: "nic"
    };

  }

  addPerson() {
    let ppl = this.state.people
    ppl.push(document.getElementById("novejmeno").value)
    document.getElementById("novejmeno").value = ""
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

    const people = this.state.people.map((name) => <Person key={name} name={name}/>);
    
    return <div>
      <Header />
      <div className="card bg-light my-3 ms-3" style={{width: '13rem'}}>
        <img src="images/penizky_malo.png" className="card-img-top img-thumbnail" alt="hromadka penez"/>
        <div className="card-body bg-primary">
          <h4 className="text-center text-light">Jarda</h4>
          <p className="card-text text-center text-light">-485 kc</p>
        </div>
      </div>
      {people}  {/*text-capitalize*/}
      <ul className="nav nav-tabs nav-justified">
          <li className="nav-item">
            <button className="nav-link active" id="transakce-tab" data-bs-toggle="tab" data-bs-target="#transakce-tab-pane" type="button" role="tab" aria-controls="transakce-tab-pane" aria-selected="true">Transakce</button>
          </li>
          <li className="nav-item">
            <button className="nav-link" id="dluhy-tab" data-bs-toggle="tab" data-bs-target="#dluhy-tab-pane" type="button" role="tab" aria-controls="dluhy-tab-pane" aria-selected="false">Dluhy</button>
          </li>
          <li className="nav-item">
            <button className="nav-link" id="clenove-tab" data-bs-toggle="tab" data-bs-target="#clenove-tab-pane" type="button" role="tab" aria-controls="clenove-tab-pane" aria-selected="false">Členové</button>
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="transakce-tab-pane" role="tabpanel" aria-labelledby="transakce-tab" tabindex="0">...</div>
          <div class="tab-pane fade" id="dluhy-tab-pane" role="tabpanel" aria-labelledby="dluhy-tab" tabindex="0">...</div>
          <div class="tab-pane fade" id="clenove-tab-pane" role="tabpanel" aria-labelledby="clenove-tab" tabindex="0">...</div>
        </div>
      
      
      <div>{this.state.nakejtext}</div>
      <input type="text" id="novejmeno" className="form-control" placeholder="Paprda do tymu"/>
      <button type="button" className="btn btn-primary" onClick={() => this.addPerson()}>Pridej paprdu</button>

      <div className="fixed-bottom bg-primary fs-3 d-flex align-items-center" style={{height: '70px'}}>
        <span className="badge rounded-pill bg-light text-dark ms-3">1 EUR = 24 CZK</span>
        <span className="badge rounded-pill bg-warning text-dark ms-3">1 USD = 22 CZK</span>
      </div>
    </div>
  }
}

export default App
