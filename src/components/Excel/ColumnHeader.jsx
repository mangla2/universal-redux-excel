import React from "react";

export default class CellHeader extends React.Component {
    render = () => {
        return (
            <th className="rowcolumnheaders" key={this.key}>{this.props.theaderdata.value}</th>
        );
    }
}
