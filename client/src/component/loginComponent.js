import React from 'react'
import {withRouter} from "react-router-dom"

const Login = ({onLogin, history}) =>
{
	let input;
	return (
		<div>
	<form onSubmit={e=>{
		e.preventDefault();
		if(!input.value.trim()){
			return
		}
		onLogin(input.value);
		history.push("/home")
	}}>
		<label>
			UserName:
			<input type='text' name='username' ref={username => input = username}/>
		</label>
		<button type='submit'>Login</button>
	</form>
		</div>
)};

export default withRouter(Login);
