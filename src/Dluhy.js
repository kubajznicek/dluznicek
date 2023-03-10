import React, { Component } from "react";

class Dluhy extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  debts = () => {
    this.props.debtsHandler()
  }

  render() {

    const dluhy = this.props.debts?.map(function(debts, idx) {
      return (
        <li className="list-group-item d-flex justify-content-between align-items-center" key={idx}>
             <div className="d-flex align-items-center">
               <img src="images/profile_picture.png" width="40" height="40" alt="profilový obrázek"/>
               <h5 className="my-0 ms-2 text-capitalize" >{debts.who}</h5>
             </div>
             <div className="d-flex align-items-center gap-3">
               <span className="text-danger">{debts.amount}</span>
              <img src="images/sipka.png" width="25" height="25" alt="profilový obrázek"/>
             </div>
             <div className="d-flex align-items-center">
               <h5 className="my-0 me-2 text-capitalize" >{debts.whom}</h5>
               <img src="images/profile_picture.png" width="40" height="40" alt="profilový obrázek"/>
             </div>
           </li>

      );
    });



    return (
      <div>
        <br></br>
        <ul className="list-group d-grid col-6 mx-auto">
          {dluhy}
        </ul>
        <br></br>

        <div className="d-grid col-3 mx-auto">
          <button type="button" className="btn btn-primary" onClick={this.debts}>
            Splatit dluhy
          </button>
        </div>

      </div>
    )
  }
}

export default Dluhy;
