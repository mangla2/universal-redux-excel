import React,{ Component } from 'react'
import Navbar from '../components/Navbar.jsx';
import Excel from '../components/Excel.jsx';

export default class Index extends React.Component{
   constructor(){
     super()
     this.state={};
   }
   render(){
     return(
       <div>
        <Navbar/>
        <Excel/>
       </div>
     );
  }
}
