import { post } from '../post';

export function signPost(user,password){
	const result = post('/api/signInfo',{
		user: user,
		password: password
	});
	return result;
}