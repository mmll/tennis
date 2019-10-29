import 'whatwg-fetch'
export default async function postData(url = '', data = {}){

		return fetch(url, {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			headers: {
				'Content-Type': 'application/json'
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			// redirect: 'follow', // manual, *follow, error
			// referrer: 'no-referrer', // no-referrer, *client
			body: JSON.stringify(data) // body data type must match "Content-Type" header
		})

}
// const service = {
// 	postData: async function(url = '', data = {}){
// 		try{
// 			fetch(url, {
// 				method: 'POST', // *GET, POST, PUT, DELETE, etc.
// 				cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
// 				headers: {
// 					'Content-Type': 'application/json'
// 					// 'Content-Type': 'application/x-www-form-urlencoded',
// 				},
// 				// redirect: 'follow', // manual, *follow, error
// 				// referrer: 'no-referrer', // no-referrer, *client
// 				body: JSON.stringify(data) // body data type must match "Content-Type" header
// 			}).then(res=>{
// 				if(res.ok){
// 					return res.json();
// 				}else{
// 					alert("HTTP-Error: " + res.status);
// 				}
// 			});
//
// 		}
// 		catch (e) {
//
// 		}
//
// 	}
// };
// export default service;
