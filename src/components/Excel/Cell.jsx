import React from "react";
import ReactDOM from "react-dom";
import {updatedCellValue, updatedSelectedCells } from '../../actions/Actions';
import {connect} from 'react-redux';

class Cell extends React.Component {
  constructor(){
    super();
    this.state={
      hovered:false,
    };
  }
  style() {
     if (this.state.hovered) {
       return { cursor:"cell" }
     } else {
       return { cursor:"auto" }
     }
   }
  handleMouseDown(e){
	 let selectedCells = [];
   selectedCells.push(this.props.celldata);
	 this.props.updateSelected(selectedCells);
	 this.props.updateMouseDown(true);
    return false;
    }
   changeHandler(e){
     let selectedCells = [];
     selectedCells.push(this.props.celldata);
    this.props.updateSelected(selectedCells);
   }
    handleBlur(e){
  let value = e.target.innerText;
  if(this.props.celldata.value !== value) {
   this.props.updateCell(value, this.props.celldata);
  }
 }
 handleKeyEvent(i,evt){
	 if(evt.ctrlKey && (evt.which === 66 || evt.which === 73 || evt.which === 85 || evt.which === 86 )) {
		var elm = evt.target;
		evt.preventDefault();
	 switch(evt.which) {
	   case 66 :  {
		   elm.style.fontWeight = 'bold';
		break;
	   }
	   case 73: {
		   	elm.style.fontStyle = 'italic';
		break
	   }
	   case 85 : {
		     	elm.style.textDecoration = 'underline';
	   }
     case 86: {
 	    if(elm) {
 	     	this.props.pasteCell(this.props.celldata);
 		}
 		break
 	   }

	}
	 }
   if(evt.which === 37 || evt.which ===38 || evt.which === 39 || evt.which === 40){
     var elm = evt.target;
 		evt.preventDefault();
    let activeCellPosition= this.props.selected;
    let totalRows=[];

    switch(evt.which){
      case 37:
      console.log('left');
      totalRows.map(function(row, rowIndex) {
        console.log(row.index);
        if(row.index === activeCellPosition.x) {
          row.data.map(function(cell, cellIndex) {
           if(cell.y === activeCell.y) {
             console.log('man yoohoo');
           }
         })
      }
    })
      break;

      case 38:
      console.log('up');
      break;
      case 39:
      console.log('right');
       break;
      case 40:
      console.log('down');
      break;
    }
   }

}
    handleFocus(e){
	    e.target.focus();

      this.props.updateActiveCellValue(this.props.celldata);
    }
    onMouseOver() {
      this.setState({ hovered:true });
    }

    onMouseOut() {
        this.setState({ hovered:false });
    }
    handleMouseOver(e){
      if (this.props.isMouseDown) {
		  if(this.props.celldata.x ===  this.props.copyAxis.x || this.props.celldata.y === this.props.copyAxis.y) {
			  if(this.props.copyAxis.d) {
				  if(((this.props.celldata.x === this.props.copyAxis.x) && this.props.copyAxis.d === 'V') || ((this.props.celldata.y === this.props.copyAxis.y) && this.props.copyAxis.d === 'H')){
					  return true;
				  }
			  } else{
				    let direction = (this.props.celldata.x ===  this.props.copyAxis.x) ? 'H' : 'V';
				    this.props.updateCopyAxis('','', direction);
			  }
		   let selectedCells = this.props.selected;
		   selectedCells.push(this.props.celldata);
		   this.props.updateSelected(selectedCells);
	  }
      }
    }
   render() {
	  let cell = JSON.stringify(this.props.celldata);
    let tdClass = '';

    this.props.selected.map((hcell)=> {
		    if(hcell.y === this.props.celldata.y && hcell.x === this.props.celldata.x){
				tdClass +='selected';
			}
	  })
    return (
	          <td style={this.style()}  className={tdClass} key={this.key} onMouseOver={this.onMouseOver.bind(this)} onMouseOut={this.onMouseOut.bind(this)}  data-cell={cell} data-index={this.props.celldata.y}>
              <div className="content-box" contentEditable onChange={this.changeHandler.bind(this)} onMouseOver={this.handleMouseOver.bind(this)} onMouseDown={this.handleMouseDown.bind(this)} onFocus={this.handleFocus.bind(this)} onKeyDown={this.handleKeyEvent.bind(this,this.key)} onBlur={this.handleBlur.bind(this)}>{this.props.celldata.value}</div>
            </td>
    );
  }
}
const mapStateToProps = function(state){
  return {
      totalRows:state.spreadsheetReducer.totalRows,
  }
}

const mapDispatchToProps=(dispatch)=> {
  return {
    updateActiveCellValue:(value) => {dispatch(updatedCellValue(value))},
    updateSelected:(value)=>{dispatch(updatedSelectedCells(value))}

  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Cell)
