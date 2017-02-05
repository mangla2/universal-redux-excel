import React from 'react';
import {connect} from 'react-redux';

class ExcelSearch extends React.Component{

  calculateIndex(value){

    if(value){
    let rowIndex=value.x + 1;
    let columnIndex=value.y;
    let newColumnIndex = String.fromCharCode(65 + (columnIndex % 26));
    if(columnIndex > 25) {

    let getFirstDigit=this.giveMultiples(columnIndex)- 1;
    let getFirstLetter=String.fromCharCode(65 + (getFirstDigit % 26));

    let getSecondDigit=this.giveMode(columnIndex);
    let getSecondLetter=String.fromCharCode(65 + (getSecondDigit % 26));

    newColumnIndex=getFirstLetter + getSecondLetter;

  }
  const finalIndex=newColumnIndex + rowIndex;
   return finalIndex;

}
else{
  return '';
}
}
  giveMultiples(n){
    return n/26;
  }

  giveMode(n){
    return n%26;
  }
  render(){
     return(
       <div><input className="col-md-12" type="text" value={this.calculateIndex(this.props.activeCellValue)} onChange={function() {}}/></div>
     );

  }
}

const mapStateToProps = function(state){
  return {
    cellPrefix: state.spreadsheetReducer.cellPrefix,
    activeCellValue:state.spreadsheetReducer.activeCellValue
  }
}

export default connect(mapStateToProps,null)(ExcelSearch)
