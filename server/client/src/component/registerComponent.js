import React, {useState} from 'react'
import service from './../service/fetch'


const RegisterComponent = () => {
	let input;
	const [user, setUser] = useState({username: '', email: '', password: ''});
	const handleInputChange = e => {
		const {name, value} = e.target;
		setUser({...user, [name]: value})
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		fetch('/api/register').then(res=>{
			debugger;

		}).catch(e=>{
			debugger;
		})
	};
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label>
					UserName:
					<input type='text' name='username' value={user.username} onChange={handleInputChange}/>
				</label>
				<label>
					Email:
					<input type='email' name='username' value={user.email} onChange={handleInputChange}/>
				</label>
				<label>
					Password:
					<input type='password' name='username' value={user.password} onChange={handleInputChange}/>
				</label>
				<button type='submit'>Register</button>
			</form>
		</div>
	)
};

export default RegisterComponent;
