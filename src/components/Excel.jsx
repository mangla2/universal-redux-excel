import React,{ Component } from 'react';
import { connect } from "react-redux";

import ColumnHeader from "./excel/ColumnHeader.jsx";
import CellRow from "./excel/CellRow.jsx";
import ExcelSearch from './excel/ExcelSearch.jsx';
import { addRow, addCell, updatedCellValue,updateCell,updateCopiedCells,pasteCell } from "../actions/Actions";

require('../assets/style.css');


class Excel extends React.Component{
  constructor(){
    super();
    this.state={
      activeCellValue:'',
      isMouseDown:false,
      selectedCells:[],
      boldStatus:false,
      italicStatus:false,
      underlineStatus:false,
      copyAxis : {
			   x: '', y: '', direction :''
		   }
    }
  }


   updateMouseDown(value){
     this.setState({
       isMouseDown: value,
      })
   }
   updateCell(value, cellData){
		this.props.updateCellProps(value, cellData);
	}
  updateCopyAxis(x,y,d){
   let copyAxis = this.state.copyAxis;
   if(d) {
     copyAxis.d = d;
   } else {
     copyAxis.x = x;
     copyAxis.y = y;
     copyAxis.d = '';
   }
     this.setState({copyAxis});
 }
  pasteCells(cellData){
   this.props.paste(cellData);
  }
   addRow(){
      this.props.addRow();
    }

   addColumn(){
 	    this.props.addColumn();
 	}

  addBoldStyling(){
    this.setState( { boldStatus : !this.state.boldStatus } );

  }
  addItalicStyling(){
    this.setState( { italicStatus : !this.state.italicStatus } );
  }
  addUnderlineStyling(){
    this.setState( { underlineStatus : !this.state.underlineStatus } );
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.activeCellValue) {

      this.setState({
        activeCellValue:this.props.activeCellValue
      });
    }
    if(nextProps.selectedCells){
      this.setState({ selectedCells: this.props.selectedCells })
    }
  }
  handleKeyEvent(evt){
     let that = this;
     if(evt.ctrlKey && (evt.keyCode === 67 || evt.keyCode === 86)) {
         switch(evt.keyCode) {
             case 67 :  {
               if(that.state.selectedCells.length> 0) {
                       let copiedCells = that.state.selectedCells.map(function(cc, index) {
               return cc;
                       });
               if(copiedCells.length > 0){
                 
                   that.props.updateCopiedValue(copiedCells);
               }
               }
               break;
             }
         }
     }
   }
  componentWillMount(){
    console.error = (function() {
     var error = console.error

     return function(exception) {
         if ((exception + '').indexOf('Warning: A component is `contentEditable`') != 0) {
             error.apply(console, arguments)
         }
     }
 })()
 }

 handleMouseUpEvent(e){
     this.updateMouseDown(false);
 }

   render(){
     let tableRows = [], tableHeads = [];
		const that = this;
		this.props.cellTitles.map(function(cell,index) {
            tableHeads.push(<ColumnHeader key={index} theaderdata={cell}
                    activeCellValue={that.state.activeCellValue}
                    isMouseDown={that.state.isMouseDown}
                    selectedCell={that.state.selectedCells}
                    updateMouseDown={that.updateMouseDown.bind(that)}

                   />);
        });
  		this.props.totalRows.map(function(row, index) {
            tableRows.push(<CellRow key={index + 1}
                                 trowdata={row}
                                 activeCellValue={that.state.activeCellValue}
                                 isMouseDown={that.state.isMouseDown}
                                 selectedCell={that.state.selectedCells}
                                 updateMouseDown={that.updateMouseDown.bind(that)}
                                 updateCell={that.updateCell.bind(that)}
                                 copyAxis={that.state.copyAxis}
                                 updateCopyAxis={that.updateCopyAxis.bind(that)}
                                 pasteCell={that.pasteCells.bind(that)}
                                 boldStyle={that.state.boldStatus ? 'bold':''}
                                 italicsStyle={that.state.italicStatus ? 'italic':''}
                                 underlineStyle={that.state.underlineStatus ? 'underline':''}
                                 />);
        });
     return(
       <div className="excel-container">
		<section className="sec-excel col-md-12">
    <div className="col-md-12 excel-tools">
    <div className="col-md-4"><ExcelSearch activeCellValue={this.state.activeCellValue} /></div>
   <div className="col-md-8">
   <button id="add-row" onClick={this.addRow.bind(this)}><i className="fa fa-arrows-v" aria-hidden="true"></i></button><span> | </span>
   <button id="add-column" onClick={this.addColumn.bind(this)}><i className="fa fa-arrows-h" aria-hidden="true"></i></button><span> | </span>
   <button id="bold" onClick={this.addBoldStyling.bind(this)}><i className="fa fa-bold" aria-hidden="true"></i></button><span> | </span>
   <button id="italic" onClick={this.addItalicStyling.bind(this)}><i className="fa fa-italic" aria-hidden="true"></i></button><span> | </span>
   <button id="underline" onClick={this.addUnderlineStyling.bind(this)}><i className="fa fa-underline" aria-hidden="true"></i></button>

   </div>
   </div><br/>
            <div className="excel-table-wrapper col-md-12">

	           <div className="col-md-12 excel-wrapper">
	             	    <table id="excel-table" onMouseUp={this.handleMouseUpEvent.bind(this)}>
	             	        <thead><tr>
                              {tableHeads}
		                        </tr></thead>
		                    <tbody onKeyDown={this.handleKeyEvent.bind(this)}>
						             {tableRows}
		                    </tbody>
		                </table>
		            </div>
			      </div>

          </section>
        </div>
     );
   }
}
const mapStateToProps = function(state){
  return {
    cellTitles: state.spreadsheetReducer.cellTitles,
    totalRows:state.spreadsheetReducer.totalRows,
    activeCellValue:state.spreadsheetReducer.activeCellValue,
    selectedCells:state.spreadsheetReducer.selectedCell,
  }
}

const mapDispatchToProps=(dispatch)=> {
  return {

    addRow:()=>{dispatch(addRow())},
    addColumn:()=>{dispatch(addCell())},
    updateCellProps:(value,cellData)=>{dispatch(updateCell(value,cellData))},
    updateCopiedValue:(value)=>{dispatch(updateCopiedCells(value))},
    paste:(cellData)=>{dispatch(pasteCell(cellData));
	}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Excel)
