const user = {'firstName':"" ,'LastName':""};

export const getUser = user=>({
	type: 'GET_USER',
	payload: user,
});
