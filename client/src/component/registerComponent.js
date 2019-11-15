import React, {useState} from 'react'
import postData from './../service/fetch'
import {withRouter} from "react-router-dom"


const RegisterComponent = (props) => {
	let input;
	const [user, setUser] = useState({username: '', email: '', password: ''});
	const [message, setMessage] = useState("");
	const handleInputChange = e => {
		const {name, value} = e.target;
		setUser({...user, [name]: value})
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		const res = await postData('/api/register', {user});
		if(res.status == 500){
			setMessage('failed');
		}else if(res.status == 200){
			props.history.push('/home');
		}
	};
	return (
		<div>
			<div>{message}</div>
			<form onSubmit={handleSubmit}>
				<label>
					UserName:
					<input type='text' name='username' value={user.username} onChange={handleInputChange}/>
				</label>
				<label>
					Email:
					<input type='email' name='email' value={user.email} onChange={handleInputChange}/>
				</label>
				<label>
					Password:
					<input type='password' name='password' value={user.password} onChange={handleInputChange}/>
				</label>
				<button type='submit'>Register</button>
			</form>
		</div>
	)
};

export default withRouter(RegisterComponent);
