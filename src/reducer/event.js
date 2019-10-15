const events = (state = {}, action) =>{
	switch(action.type){
		case 'ADD_EVENT':
			return [...state,{tag: action.payload.tag}];
		default:
			return state;
	}
};

export default events;
