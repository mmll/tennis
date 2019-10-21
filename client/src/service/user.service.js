import postData from "./fetch";

export const userService = {
	login
};

function login(user) {
	return postData('/api/login', {user})
		.then((response) => {
			if (!response.ok) {
				throw Error(response.statusText);
			}
			return response.json();
		})
		.then((data) => {
			localStorage.setItem('username', data.data.username);
			localStorage.setItem('token', data.data.tokenID);
			return data;
			//dispatch(userLoggedIn(data.data.username));
		})
		.catch((e) => console.log(e));
}
