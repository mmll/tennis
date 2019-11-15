import React, {useState} from 'react'
import {withRouter} from "react-router-dom"
import postData from "../service/fetch";

const Login = ({onLogin, history, user}) =>
{
	let input;
	const [message, setMessage] = useState("");
	const handleInputChange = e => {
		const {name, value} = e.target;
		user[name] = value;
	};

	const handleLogin = async (user) => {
		const res = await postData('/api/login', {user});
		if(res.status == 200){
			history.push('/home');
		}
		else{
			setMessage('failed');
		}
	};

	return (
		<div>
			<div>{message}</div>
	<form onSubmit={e=>{
		e.preventDefault();
		if(!user['username'] || !user['password']){
			return
		}
		handleLogin(user);
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
