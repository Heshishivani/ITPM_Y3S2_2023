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
      <div>
        {this.state.plastics.map(sellers =>(
         <div>
          <p>{sellers.name}</p>
          <p>{sellers.mobile}</p>
          <p>{sellers.weight}</p>
          <p>{sellers.price}</p>
         </div>

        ))}
      </div>
    )
  }
}