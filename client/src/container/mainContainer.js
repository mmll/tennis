import React from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import SportConatiner from "./sportConatiner";
const MainContainer = function(){
	return (
		<Router>
			<ul>
				<li>
					<Link to="/sport">Sport</Link>
				</li>
				<li>
					<Link to="/movie">Movie</Link>
				</li>
				<li>
					<Link to="/book">Book</Link>
				</li>
			</ul>
			<Switch>
				<Route path="/sport">
					<SportConatiner/>
				</Route>
				<Route path="/movie">
				</Route>
				<Route path="/book">
				</Route>
			</Switch>
		</Router>)
};
export default MainContainer;
