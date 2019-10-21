import {userService} from "../service/user.service";

const user = {'firstName': "", 'LastName': ""};
let nextTodoId = 0;

export const getUser = user => ({
	type: 'GET_USER',
	payload: user,
});

export const addEvent = event => ({
	type: 'ADD_EVENT',
	payload: {...event, id: nextTodoId++},
});

export const deleteEvent = event => ({
	type: 'DELETE_EVENT',
	payload: event,
});

export const updateEvent = event => ({
	type: 'UPDATE_EVENT',
	payload: event,
});


export const loginUser = event => ({
	type: 'LOGIN_USER',
	payload: user,
});
