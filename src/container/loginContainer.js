import {connect} from 'react-redux';
import {getUser} from '../actions/index'
import LoginComponent from '../component/loginComponent'

const mapStateToProps = state =>({
	user: state.user,
});

const mapDispatchToProps = dispatch =>({
	onLogin:(user)=>{
		dispatch(getUser(user));
	}
});

const LoginContainer = connect(
	mapStateToProps,
	mapDispatchToProps)(LoginComponent);

export default LoginContainer;
