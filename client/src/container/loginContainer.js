import {connect} from 'react-redux';
import {submitLogin} from '../actions/index'
import LoginComponent from '../component/loginComponent'
import postData from './../service/fetch'

const mapStateToProps = (state) =>({
	user: state.user
});

const mapDispatchToProps = (dispatch,ownProps )=>({
	onLogin: user=> dispatch(submitLogin(user))
});

const LoginContainer = connect(
	mapStateToProps,
	mapDispatchToProps)(LoginComponent);

export default LoginContainer;
