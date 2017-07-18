import { get } from '../get'

export function getLoginInfo(){
	const result = get('/api/loginInfo');
	return result;
}