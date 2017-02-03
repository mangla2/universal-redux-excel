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
