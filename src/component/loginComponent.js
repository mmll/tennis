import React from 'react'
import PropType from 'prop-types'

const Login = ({onLogin}) =>
{
	let input;
	return (
	<form onSubmit={e=>{
		e.preventDefault();
		if(!input.value.trim()){
			return
		}
		onLogin(input.value);
	}}>
		<label>
			UserName:
			<input type='text' name='username' ref={username => input = username}/>
		</label>
		<button type='submit'>Login</button>
	</form>
)};


export default Login;
