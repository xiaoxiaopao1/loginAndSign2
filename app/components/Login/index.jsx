import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.less';
class Login extends React.Component {
	constructor(props){
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			user: '',
			psw: '',
			userErr: false,
			pswErr: false
		}
	}
	render(){
		let userStyle = {
			userInput : {},
			userMark: {}
		}
		userStyle.userMark.visibility = this.state.userErr ? 'visible' : '';
		userStyle.userInput.border = this.state.userErr ? '1px solid red' : '';

		let pswStyle = {
			pswInput : {},
			pswMark: {}
		}
		pswStyle.pswMark.visibility = this.state.pswErr ? 'visible' : '';
		pswStyle.pswInput.border = this.state.pswErr ? '1px solid red' : '';
		return(
			<div className = "login">
				<h2>用户名:</h2>
				<input placeholder='请输入用户名'
					   value={this.state.user} 
					   style={{border: userStyle.userInput.border}}
					   onBlur = {this.handleUserBlur.bind(this)}
					   onFocus = {this.handleUserFocus.bind(this)}
					   onChange={this.handleUser.bind(this)} />
				<span className="mark" 
					  style={{visibility: userStyle.userMark.visibility}}>
					  用户名不存在
				</span>

				<h2>密码:</h2>
				<input placeholder='请输入密码'
					   value={this.state.psw} 
					   style = {{border: pswStyle.pswInput.border}}
					   onFocus={this.handlePswFocus.bind(this)}
					   ref='psw'
					   onChange={this.handlePsw.bind(this)} />

				<span className="mark" 
					  style={{visibility: pswStyle.pswMark.visibility}} >
					  密码错误，请重新输入
				</span>

				<button onClick={this.handleLogin.bind(this)}>登录</button>
			</div>
		)
	}
	handleUser(e){
		this.setState({
			user: e.target.value
		})
	}
	handlePsw(e){
		this.setState({
			psw: e.target.value
		})
	}
	handleLogin(){
		const data = this.props.data;
		const isUser = data.some(item => {
			return item.user == this.state.user
		});
		const success = data.some(item => {
			return item.user == this.state.user && item.password == this.state.psw;
		})
		switch(true){
			case !isUser:
				console.log('用户名不存在');
				break;
			case success:
				alert('登录成功');
				break;
			default:
				this.setState({
					pswErr: true
				});
		}
	}
	handleUserBlur(){
		const data = this.props.data;
		const isUser = data.some(item => {
			return item.user == this.state.user
		});
		if (!isUser) {
			this.setState({
				userErr: true
			})
		}
	}
	handleUserFocus(){
		this.setState({
			userErr: false
		})
	}
	handlePswFocus(){
		this.setState({
			pswErr: false
		})
	}
}
export default Login