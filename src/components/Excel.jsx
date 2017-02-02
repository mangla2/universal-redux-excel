import React,{ Component } from 'react';
import { connect } from "react-redux";

import ColumnHeader from "./excel/ColumnHeader.jsx";
import CellRow from "./excel/CellRow.jsx";
import { addRow, addCell } from "../actions/Actions";

require('../assets/style.css');


class Excel extends React.Component{
  constructor(){
    super();
  }

   addRow(){
      this.props.dispatch(addRow());
    }

   addColumn(){
 	    this.props.dispatch(addCell());
 	}

   render(){
     let tableRows = [], tableHeads = [];
		const that = this;
    console.log(this.props.cellTitles);
    console.log(this.props.totalRows);
		this.props.cellTitles.map(function(cell,index) {
            tableHeads.push(<ColumnHeader key={index} theaderdata={cell} />);
        });
  		this.props.totalRows.map(function(row, index) {
            tableRows.push(<CellRow key={index + 1}  trowdata={row} />);
        });
     return(
       <div className="excel-container">
		<section className="sec-excel col-md-12">
    <div className="col-md-12 excel-tools">
   <button id="add-row" onClick={this.addRow.bind(this)}><i className="fa fa-arrows-v" aria-hidden="true"></i></button><span> | </span>
   <button id="add-column" onClick={this.addColumn.bind(this)}><i className="fa fa-arrows-h" aria-hidden="true"></i></button>
   </div><br/>
            <div className="excel-table-wrapper col-md-12">

	           <div className="col-md-12 excel-wrapper">
	             	    <table id="excel-table">
	             	        <thead><tr>
                              {tableHeads}
		                        </tr></thead>
		                    <tbody>
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
    totalRows:state.spreadsheetReducer.totalRows
  }
}

export default connect(mapStateToProps)(Excel)
