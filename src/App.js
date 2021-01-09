
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
        
        this.renderMyData();
    }

    renderMyData(){
        fetch('https://search-dynamodbto-elasticsearch-kto6hxg5b3t2um4pvypqggqm4i.ap-south-1.es.amazonaws.com/mydatafroms3/_search/?size=204')
            .then((response) => response.json())
            .then((responseJson) => {
              console.log(responseJson)
              var x=[]
              var k=responseJson.hits.hits
              // var time_string=""
              // var new_time=""
              // var ii=0
              for(var i=0;i<k.length;i++){
                var time_string=k[i]["_source"]["updatetime"]
                // for(ii=0;ii<10;ii++){new_time+=time_string[ii]}
                // new_time=new_time+'T'
                // for(ii=11;ii<19;ii++){new_time+=time_string[ii]}
                // new_time=new_time+'Z'
                var y={
                        "Cupcake":k[i]["_source"]["Cupcake"],
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

