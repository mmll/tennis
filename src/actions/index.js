const user = {'firstName':"" ,'LastName':""};

export const getUser = user=>({
	type: 'GET_USER',
	payload: user,
});

export const addEvent = event=>({
	type: 'ADD_EVENT',
	payload: event,
});
