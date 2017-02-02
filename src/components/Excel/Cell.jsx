import React from "react";
import ReactDOM from "react-dom";


export default class Cell extends React.Component {

  render() {
	  let cell = JSON.stringify(this.props.celldata);
    return (
	          <td key={this.key} data-cell={cell} data-index={this.props.celldata.y}> <div className="content-box">{this.props.celldata.value}</div>
            </td>
    );
  }
}
