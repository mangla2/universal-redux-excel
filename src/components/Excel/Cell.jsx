import React from "react";
import ReactDOM from "react-dom";
import {updatedCellValue} from '../../actions/Actions';
import {connect} from 'react-redux';

class Cell extends React.Component {
  constructor(){
    super();
    this.state={
      hovered:false
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
  handleDirections(event){
   if(event.keyCode == 38){
     this.props.cellData.y= this.props.cellData.y-1;
  }
  else if(event.key == 39){
      this.props.cellData.x = this.props.cellData.x + 1;
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

   render() {
	  let cell = JSON.stringify(this.props.celldata);
    let tdClass = '';
    this.props.selectedCell.map((hcell)=> {
		    if(hcell.y === this.props.celldata.y && hcell.x === this.props.celldata.x){
				tdClass +='selected';
			}
	  })
    return (
	          <td style={this.style()}  className={tdClass} key={this.key} onKeyPress={this.handleDirections.bind(this)} onMouseOver={this.onMouseOver.bind(this)} onMouseOut={this.onMouseOut.bind(this)}  data-cell={cell} data-index={this.props.celldata.y}>
              <div className="content-box" contentEditable onMouseDown={this.handleMouseDown.bind(this)} onFocus={this.handleFocus.bind(this)}>{this.props.celldata.value}</div>
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
