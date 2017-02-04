import React from "react";
import ReactDOM from "react-dom";
import {updatedCellValue} from '../../actions/Actions';
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
	 this.props.updateSelectedCells(selectedCells);
	 this.props.updateMouseDown(true);
    return false;
    }
    handleBlur(e){
  let value = e.target.innerText;
  if(this.props.celldata.value !== value) {
   this.props.updateCell(value, this.props.celldata);
  }
 }
 handleKeyEvent = (evt) => {
	 if(evt.ctrlKey && (evt.which === 66 || evt.which === 73 || evt.which === 85 || evt.which === 86 )) {
		var elm = evt.target;
		evt.preventDefault();
	 switch(evt.which) {
	   case 66 :  {
		   elm.style.fontWeight = 'bold';
		break;
	   }
	   case 73: {
		   	elm.style.fontFamily = 'italic';
		break
	   }
	   case 85 : {
		     	elm.style.textDecoration = 'underline';
	   }


	}
	 }
  }
    handleFocus(e){
	    e.target.focus();
      console.log(this.props.celldata);
      this.props.updateActiveCellValue(this.props.celldata);
    }
    onMouseOver() {
      this.setState({ hovered:true });
    }

    onMouseOut() {
        this.setState({ hovered:false });
    }

   render() {
	  let cell = JSON.stringify(this.props.celldata);
    let tdClass = '';

    this.props.selectedCell.map((hcell)=> {
		    if(hcell.y === this.props.celldata.y && hcell.x === this.props.celldata.x){
				tdClass +='selected';
			}
	  })
    return (
	          <td style={this.style()}  className={tdClass} key={this.key} onMouseOver={this.onMouseOver.bind(this)} onMouseOut={this.onMouseOut.bind(this)}  data-cell={cell} data-index={this.props.celldata.y}>
              <div className="content-box" contentEditable onMouseDown={this.handleMouseDown.bind(this)} onFocus={this.handleFocus.bind(this)} onKeyDown={this.handleKeyEvent.bind(this)} onBlur={this.handleBlur.bind(this)}>{this.props.celldata.value}</div>
            </td>
    );
  }
}

const mapDispatchToProps=(dispatch)=> {
  return {
    updateActiveCellValue:(value) => {dispatch(updatedCellValue(value))},

  }
}
export default connect(null,mapDispatchToProps)(Cell)
