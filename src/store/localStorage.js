const initialState = {
	  onMouseDown:false,
	  activeCellValue:'',
    selectedCell:[],
    copiedData:[],
	  cellIndex : 9,
    cellCount : 9,
    rowIndex : 5,
    cellPrefix : '',
    cellTitles: [{index: -1, value: 'No.'}, {index :0, value :'A'}, {index :1, value :'B'}, {index :2, value :'C'},{index :3, value :'D'},{index :4, value :'E'},{index :5, value :'F'},{index :6, value :'G'},{index :7, value :'H'},{index :7, value :'I'}],
    totalRows: [{index : 0, data: [
			   { x: 0, y:0, value :''},
			   { x: 0, y:1, value :''},
			   {x: 0, y:2, value :''},
         {x:0, y:3,  value:''},
         {x:0,y:4,value:''},
         {x:0,y:5,value:''},
         {x:0,y:6,value:''},
         {x:0,y:7,value:''},
         {x:0,y:8,value:''}]},

		    { index :1, data: [
			   { x: 1, y:0, value :''},
			   { x: 1, y:1, value :''},
			   {x: 1, y:2, value :''},
         {x:1, y:3,  value:''},
         {x:1,y:4,value:''},
         {x:1,y:5,value:''},
         {x:1,y:6,value:''},
         {x:1,y:7,value:''},
         {x:1,y:8,value:''}
       ]},
	        { index:2, data: [
			   { x: 2, y:0, value :''},
			   { x: 2, y:1, value :''},
			   {x: 2, y:2, value :''},
         {x:2, y:3,  value:''},
         {x:2,y:4,value:''},
         {x:2,y:5,value:''},
         {x:2,y:6,value:''},
         {x:2,y:7,value:''},
         {x:2,y:8,value:''}
       ]},
       { index:3, data: [
      { x: 3, y:0, value :''},
      { x: 3, y:1, value :''},
      {x: 3, y:2, value :''},
      {x:3, y:3,  value:''},
      {x:3,y:4,value:''},
      {x:3,y:5,value:''},
      {x:3,y:6,value:''},
      {x:3,y:7,value:''},
      {x:3,y:8,value:''}
    ]},
    { index:4, data: [
   { x: 4, y:0, value :''},
   { x: 4, y:1, value :''},
   {x: 4, y:2, value :''},
   {x:4, y:3,  value:''},
   {x:4,y:4,value:''},
   {x:4,y:5,value:''},
   {x:4,y:6,value:''},
   {x:4,y:7,value:''},
   {x:4,y:8,value:''}
  ]}]
};

class Storage {
    getState() {
      let state;

		if(typeof (localStorage) !== "undefined") {

		   state = JSON.parse(localStorage.getItem('sheetstate'));
      return (state === null) ? initialState : state ;
		}
    return initialState;
	}
	setState(state) {


        if (typeof (localStorage) !== 'undefined') {
            localStorage.setItem('sheetstate', JSON.stringify(state));
			}

    }
}
const storage = new Storage();

export default storage;
