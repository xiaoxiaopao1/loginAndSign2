import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { getLoginInfo } from '../../fetch/loginInfo/loginInfo';

import Login from '../../components/Login';
import Sign from './subpage/Sign';

import './style.less'
class LoginAndSign extends React.Component {
	constructor(props){
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			isLogin: true,
			data: []
		}
	}
	render(){
		let active1,active2;
		this.state.isLogin 
		? active1 = 'active'
		: active2 = 'active';
		return(
			<div className='login-sign'>
				<div className='btn-switch'>
					<span className={active1} onClick={this.handleLogin.bind(this)}>登录</span>
					<span className={active2} onClick={this.handleSign.bind(this)}>注册</span>
				</div>
				{
					this.state.isLogin
					?	<Login showAnimate={this.state.loginAnimate} data={this.state.data} />
					: 	<Sign showAnimate={this.state.signAnimate} data={this.state.data} />
				}
			</div>
		)
	}
	// 此处在获取后台伪数据的时候，是在componentDidMount中，该函数只在页面第一次加载的时候执行
	// 也就是说在页面不跳转的情况下，里面的操作只执行了一次，所以后台数据即使改变了，如果页面
	// 没有跳转，该操作也仅执行一次，导致刚注册的用户没办法被获取到，通过此处的console.log()就
	// 可以看到，手动f5刷新，就可以看到打印的结果不同，所以，在sign组件中，点击注册后进行了强刷新
	componentDidMount(){
		const result = getLoginInfo();
		result.then(res => {
			return res.json();

		}).then(json => {
			const data = json;
			console.log(data);
			this.setState({
				data: data
			})
		})
	}
	handleLogin(){
		this.setState({
			isLogin: true
		})
	}
	handleSign(){
		this.setState({
			isLogin: false
		})
	}

}
export default LoginAndSign