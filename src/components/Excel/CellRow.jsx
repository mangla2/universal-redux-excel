import React from "react";

import {connect} from 'react-redux';
import Cell from "./Cell.jsx";
import RowHeader from "./RowHeader.jsx";

export default class CellRow extends React.Component {
  constructor(){
    super();
   this.state={
     currentValue:''
   }
  }


    render = () => {
	    let tableCells = [];

	    tableCells.push(<RowHeader key={0} index={this.props.trowdata.index}
                       data={this.props.trowdata.data}
                       updateMouseDown={this.props.updateMouseDown}
                       updateSelectedCells={this.props.updateSelectedCells}

                       isMouseDown={this.props.isMouseDown}
                       activeCellValue={this.props.activeCellValue}
                       selectedCell={this.props.selectedCell} />);
	    const that =this;
		this.props.trowdata.data.map(function(tcell, index){
			tableCells.push(<Cell key={index + 1} celldata={tcell}
                       updateMouseDown={that.props.updateMouseDown}
                       updateCell={that.props.updateCell}
                       updateSelectedCells={that.props.updateSelectedCells}
                       isMouseDown={that.props.isMouseDown}
                       activeCellValue={that.props.activeCellValue}
                       selectedCell={that.props.selectedCell}
                       boldClass={that.props.boldStyle}
                       italicsClass={that.props.italicsStyle}
                       underlineClass={that.props.underlineStyle}
                       />);
		});

        return (
            <tr key={this.key} data-index={this.props.trowdata.index}>
	            {tableCells}
            </tr>
    );
  }
}
