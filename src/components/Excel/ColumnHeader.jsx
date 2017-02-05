import React from "react";
import {connect} from 'react-redux';

class CellHeader extends React.Component {
  constructor(){
    super();
    this.state={
      headhover:false,
    };
  }
  style() {
     if (this.state.headhover) {
       return { backgroundColor:"#40bc82",}
     } else {
       return { backgroundColor:"#FFFFFF",}
     }
   }
    onMouseOver(){
      this.setState({ headhover: true})
    }
    onMouseOut(){
      this.setState({ headhover:false})
    }
    handleMouseDown(e){
  	 let selectedCells = [];

  	 selectedCells.push(this.props.theaderdata);
  	 this.props.updateSelectedCells(selectedCells);
  	 this.props.updateMouseDown(true);
      return false;
      }
    render(){
      let columnStyle='';

      this.props.selectedCell.map((columnCell)=> {
             if(columnCell.index === this.props.activeCellValue.x){
               columnStyle +='columnselected'

             }
      })


        return (
            <th style={this.style()} className="rowcolumnheaders" onMouseDown={this.handleMouseDown.bind(this)} onMouseOver={this.onMouseOver.bind(this)} onMouseOut={this.onMouseOut.bind(this)} key={this.key}>{this.props.theaderdata.value}</th>
        );
    }
}

const mapStateToProps = function(state){
  return {
    activeCellValue: state.spreadsheetReducer.activeCellValue,
  }
}

export default connect(mapStateToProps)(CellHeader)
