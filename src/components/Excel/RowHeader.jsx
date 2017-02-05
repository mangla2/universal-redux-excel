import React from "react";
import classnames from 'classnames';

export default class RowHeader extends React.Component {
	constructor(){
    super();
    this.state={
      rowhover:false
    };
  }
  style() {
     if (this.state.rowhover) {
       return { backgroundColor:"#40bc82",}
     } else {
       return { backgroundColor:"#FFFFFF",}
     }
   }
    onMouseOver(){
      this.setState({ rowhover: true})
    }
    onMouseOut(){
      this.setState({ rowhover:false})
    }

	handleMouseDown(e){
	 let selectedCells =[];

   selectedCells.push(this.props.index);
	 this.props.updateSelectedCells(selectedCells);

	  return false;
	}

	render = () => {
		let rowNumber = this.props.index + 1;
		let myStyle='';
    //  console.log(this.props.selecetedCell);
    this.props.selectedCell.map((rowCell)=> {

			// rowCell.map((value)=>{
				  if(rowCell.x === this.props.index){
            myStyle+='referrowselected';
          }
			});


		const classes = classnames('rowcolumnheaders','rowheaders');
        return (

		    <td className={myStyle} style={this.style()} onMouseDown={this.handleMouseDown.bind(this)} onMouseOver={this.onMouseOver.bind(this)} onMouseOut={this.onMouseOut.bind(this)} key={this.key} data-index={this.props.index}>{rowNumber}
            </td>
        );
    }
}
