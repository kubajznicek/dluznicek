import React, { Component } from 'react'
import './App.css'
import Header from './Header'
import Person from './Person'

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      nakejtext: "zatim nic",
      people: []
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
      <div>{this.state.nakejtext}</div>
      {people}
      <input type="text" id="novejmeno" className="form-control" placeholder="Paprda do tymu"/>
      <button type="button" className="btn btn-primary" onClick={() => this.addPerson()}>Pridej paprdu</button>
    </div>
  }
}

export default App
