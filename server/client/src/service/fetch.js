import 'whatwg-fetch'
const service = {
	postData: function(url = '', data = {}){
		const response = fetch(url, {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json'
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			redirect: 'follow', // manual, *follow, error
			referrer: 'no-referrer', // no-referrer, *client
			body: JSON.stringify(data) // body data type must match "Content-Type" header
		}).then(response => {
			//do something with response
			const users = response.json();

		})
			.catch(err => {
				throw new Error(err)
			});
		//return  response.json(); // parses JSON response into native JavaScript objects
	}
};
export default service;
