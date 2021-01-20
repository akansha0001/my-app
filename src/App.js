
import './App.css';


import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';


import React, { Component } from 'react';


export default class App extends React.Component  {

    constructor(props) { 
      super(props);

      this.state = {
        data : null,
      };
    }

    componentWillMount() {
        console.log("check")
        this.renderMyData();
    }

    renderMyData(){
        fetch('https://7p1xt45npc.execute-api.ap-south-1.amazonaws.com/live/getdata')
            .then((response) => response.json())
            .then((responseJson) => {
              console.log("responseJson")
              
               console.log(JSON.parse(responseJson.body))
               responseJson = JSON.parse(responseJson.body)
              var x=[]
              var k=responseJson.response
              
              for(var i=0;i<k.length;i++){
                var time_string=k[i]["updatetime"]
               
                var y={
                        "Cupcake":k[i]["Cupcake"],
                        "updatetime":time_string
                      }
                x.push(y)
              }
              this.setState({ data : x })
            })
            .catch((error) => {
              console.error(error);
            });
    }

    render(){
      
      
        return(
          <LineChart
          width={500}
          height={500}
          data={this.state.data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="updatetime" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="Cupcake" stroke="#82ca9d" />
        </LineChart>
        
        );
    }
}

