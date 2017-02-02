import React from "react";

export default class RowHeader extends React.Component {

	render = () => {
		let rowNumber = this.props.index + 1;
        return (
		    <td className="rowcolumnheaders" key={this.key} data-index={this.props.index}>{rowNumber}
            </td>
        );
    }
}
