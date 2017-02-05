export function addRow() {
  return {
    type: 'ADD_ROW'
  }
}

export function addCell() {
  return {
    type: 'ADD_CELL',
  }
}

export function updatedCellValue(value){
  return{
    type: 'UPDATED_ACTIVE_VALUE',
    payload:value
  }
}

export function updatedSelectedCells(arr){
  return{
    type: 'UPDATE_SELECTED_CELLS',
    payload:arr
  }
}
export function updateCell(value, cellData) {
  return {
    type: 'UPDATE_CELL',
	payload : {
		value,
		cellData
	}
  }
}

export function updateCopiedCells(arr) {
  return {
    type: 'UPDATE_COPIED_CELLS',
	payload : arr
  }
}

export function pasteCell(cellData) {
  return {
    type: 'PASTE_DATA',
	payload: cellData
  }
}
