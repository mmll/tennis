import React from 'react'
import {withRouter} from "react-router-dom"

const Login = ({onLogin, history, user}) =>
{
	let input;
	const handleInputChange = e => {
		const {name, value} = e.target;
		user[name] = value;
	};

	return (
		<div>
	<form onSubmit={e=>{
		e.preventDefault();
		if(!user['username'] || !user['password']){
			return
		}
		onLogin(user);
	}}>
		<label>
			UserName:
			<input type='text' name='username' onChange={handleInputChange}/>
		</label>
		<label>
			Password:
			<input type='password' name='password' onChange={handleInputChange}/>
		</label>
		<button type='submit'>Login</button>
	</form>
		</div>
)};

export default withRouter(Login);
