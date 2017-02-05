import storage from "../store/localStorage";

export default function spreadsheetReducer(state=storage.getState(), action) {

    switch (action.type) {
        case "UPDATED_ACTIVE_VALUE":{

          const activeCellValue = action.payload;

            let newState = {...state , activeCellValue};
            storage.setState(newState);

            return newState;
        }
        case "UPDATE_SELECTED_CELLS":{

          const selectedCell = action.payload;

            let newState = {...state , selectedCell};
            storage.setState(newState);

            return newState;
        }
        case "ADD_ROW": {
		    let rowIndex = state.rowIndex;

		    let newRow = {index: rowIndex, data: []};
		    for(let i =0;i < state.cellCount; i++) {
			    newRow.data.push({
				    x: rowIndex,
				    y: i,
				    value :''
			    });
		    }
		    let totalRows = [];
		    state.totalRows.map(function(row) {
			    totalRows.push(row);
		    });

		    totalRows.push(newRow);
		    rowIndex = rowIndex + 1;

		    let newState = {...state , totalRows, rowIndex};
        storage.setState(newState);

		    return newState;

        }
        case "ADD_CELL": {
		    let cellTitles = [];
		    let cellPrefix = state.cellPrefix;

		    let cellCount = state.cellCount;
		    let cellIndex = state.cellIndex;
		    state.cellTitles.map(function(cellTitle, index) {
			   cellTitles.push(cellTitle);
		   })
	    	cellCount = cellCount + 1;
		    let totalRows = [];
		    let newCellIndex;
		    state.totalRows.map(function(row, index) {
			    let lastCell = row.data[row.data.length -1];
			    newCellIndex = lastCell ? lastCell.y + 1 : 0;
			    row.data.push({
				    x: row.index,
				    y: newCellIndex,
				    value :''
			     })
			     totalRows.push(row);
		    });
		    let cellTitle = {
			    index : newCellIndex,
			    value : cellPrefix  + String.fromCharCode(65 + (cellIndex % 26))
	     	}
		    cellIndex = cellIndex + 1;
	        if(cellIndex % 26 === 0) {
			    cellPrefix = isNaN(cellPrefix.charCodeAt(0))  ?  'A' : String.fromCharCode(cellPrefix.charCodeAt(0) + 1);
		    }
		    cellTitles.push(cellTitle);
		    let newState = {...state, totalRows, cellCount, cellIndex, cellPrefix, cellTitles};
            storage.setState(newState);
            return newState;
        }
        case "UPDATE_CELL": {
		    let payload = action.payload;
		    let totalRows = [];
		    state.totalRows.map(function(row, index) {
			    if(row.index === payload.cellData.x) {
				    row.data.map(function(cell, cellIndex) {
					    if(cell.y === payload.cellData.y) {
					     	row.data[cellIndex].value = payload.value;
					    }
				    });
			    }
	       totalRows.push(row);
		    });
     		let newState = {...state, totalRows};
        storage.setState(newState);
          return newState;
        }
        case "UPDATE_COPIED_CELLS" : {
		    let copiedData= action.payload;
		    let newState = {...state ,copiedData};
		    return newState;
		}
        case "PASTE_DATA": {
		    let activeCell  = action.payload;
		    let values = state.copiedData;
		    let direction = 'V';
		    if(values.length > 1 && values[0].x === values[1].x) {
			    direction = 'H';
		    }
		    let totalRows = [];
		    let previousRows = state.totalRows;
		    previousRows.map(function(row, rowIndex) {
			    if(row.index === activeCell.x) {
				    row.data.map(function(cell, cellIndex) {
					   if(cell.y === activeCell.y) {
						    row.data[cellIndex].value = values[0].value;
						    if(direction === 'H') {
							    for(let p = 1; p < values.length;p++) {
								    let nextCell = row.data[cellIndex + p];
							        if(nextCell) {
								        row.data[cellIndex + p].value = values[p].value;
								    }
							    }
						    } else if(values.length > 1) {
						            for(let q = 1; q < values.length;q++) {
							            let nextRow = previousRows[rowIndex + q];
						   	            if (nextRow) {
								           previousRows[rowIndex + q].data[cellIndex].value = values[q].value;
							            }

							        }
						    }
					    }
				    });
			    }
	            totalRows.push(row);
		    });
		    let newState = {...state, totalRows};
		    storage.setState(newState);
            return newState;
        }
        default:
        return state;

  }
}
