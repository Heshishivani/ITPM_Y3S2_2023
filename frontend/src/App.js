import React, { Component} from 'react';
import axios from 'axios';

export default class App extends Component {
constructor(props){
  super(props);

  this.state={
    plastics:[]
  };

}


componentDidMount(){
  this.retrievePlastic();
}

retrievePlastic(){
  axios.get("http://localhost:8000/plastic").then(res =>{
      if(res.data.success){
        this.setState({
          plastics:res.data.existingDetails

        });

        console.log(this.state.plastics)
      }

  });
}

  render() {
    return (
      <div className="container">
        &nbsp;
        &nbsp;
        <center><p><h3>Collection Plastic Details</h3></p></center>
        &nbsp;
        &nbsp;
        <table class="table">
          <thead>
           <tr>
            <th scope='col'></th>
            <th scope='col'>NAME</th>
            <th scope='col'>MOBILE</th>
            <th scope='col'>PLASTIC WEIGHT (kg)</th>
            <th scope='col'>PRICE TO PLASTICS (Rs)</th>
            <th scope='col'></th>

           </tr>

          </thead>
          <tbody>
        {this.state.plastics.map((sellers,index) =>(
         <tr>
          <th scope="row">{index+1}</th>
          <td>{sellers.name}</td>
          <td>{sellers.mobile}</td>
          <td>{sellers.weight}</td>
          <td>{sellers.price}</td>
          <td>

            <a className="btn btn-warning" href='#'>
              <i className="fas fa-edit"></i>&nbsp;EDIT
            </a>
            &nbsp;
            <a className="btn btn-danger" href='#'>
              <i className="far fa-trash-alt"></i>&nbsp;DELETE
            </a>

          </td>
         </tr>

        ))}
        </tbody>
        </table>
      </div>
    )
  }
}