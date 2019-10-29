const events = (state = [], action) =>{
	switch(action.type){
		case 'ADD_EVENT':
			action.payload.event.id = action.payload.id;
			return [...state,action.payload.event];
		case 'DELETE_EVENT':
			var array = [...state]; // make a separate copy of the array
			array = array.filter(item=>{return item.id!= action.payload.event.id});
			return array;
		case 'UPDATE_EVENT':
			state.forEach(function(part, index, theArray) {
				if(part.id == action.payload.event.id){
					theArray[index] = action.payload.event;
				}
			});
			return state;
		default:
			return state;
	}
};

export default events;
