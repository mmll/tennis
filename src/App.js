import React from 'react';
import './App.css';
import LoginContainer from './container/loginContainer'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import MainContainer from './container/mainContainer'

function App() {
	return (
		<Router>
			<div>
				<nav>
					<ul>
						<li>
							<Link to="/">Login</Link>
						</li>
						{/*<li>*/}
						{/*	<Link to="/home">Home</Link>*/}
						{/*</li>*/}
					</ul>
				</nav>

				<Switch>
					<Route path="/home">
						<MainContainer />
					</Route>
					<Route path="/">
						<MainContainer />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
