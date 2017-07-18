import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.less';

class Sign extends React.Component {
	constructor(props){
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			user: '',
			psw: '',
			userErr: false
		}
	}
	render(){
		const userStyle = {
			userInput: {},
			userMark: {}
		};
		userStyle.userMark.visibility = this.state.userErr ? 'visible' : '';
		userStyle.userInput.border = this.state.userErr ? '1px solid red' : '';
		return(
			<div className = "sign">
				<h2>用户名:</h2>
				<input placeholder='请输入用户名'
					   value={this.state.user} 
					   style={{border: userStyle.userInput.border}}
					   onChange={this.handleUser.bind(this)}
					   onBlur={this.handleUserBlur.bind(this)}
					   onFocus={this.handleUserFocus.bind(this)} />
				<span className="mark" 
					  style ={{visibility: userStyle.userMark.visibility}}
					  >
					  用户名已存在，请重新输入
				</span>

				<h2>密码:</h2>
				<input placeholder='请输入密码'
					   value={this.state.psw}
					   onChange={this.handlePsw.bind(this)} />

				<button onClick={this.handleSign.bind(this)}>注册</button>
			</div>
		)
	}
	handleUser(e){
		this.setState({
			user: e.target.value
		})
	}
	handleUserBlur(){
		const data = this.props.data;
		const hasUser = data.some(item => {
			return item.user == this.state.user;
		});
		if (hasUser) {
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
	handlePsw(e){
		this.setState({
			psw: e.target.value
		})
	}
	handleSign(){
		const signFn = this.props.signFn;
		signFn(this.state.user,this.state.psw);
	}
}
export default Sign