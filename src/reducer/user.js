const user = (state = {}, action) =>{
	switch(action.type){
		case 'GET_USER':
			return ;
		default:
			return state;
	}
};

export default user;
