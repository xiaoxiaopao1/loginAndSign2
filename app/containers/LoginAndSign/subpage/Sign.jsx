import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { signPost } from '../../../fetch/signInfo/signInfo';
import SignComponent from '../../../components/Sign';


class Sign extends React.Component {
	constructor(props){
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render(){
		return(
			<SignComponent data={this.props.data} signFn = {this.handleSign.bind(this)}/>
		)
	}
	handleSign(user,password){
		const result = signPost(user,password);
		result.then(res => {
			return res.json();
		}).then(json => {
			if (json.errno == 0) {
				window.location.reload();
			}
		})
	}
}
export default Sign