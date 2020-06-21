import axios from 'axios';

//Create instance and assign baseURL
const instance = axios.create({
	baseURL: `${"http://167.172.166.24:3000"}/api/v1/`,
});

//Handle Token related works
instance.defaults.headers.common['Authorization'] = 'Bearer ';

instance.interceptors.request.use((req) => {
	//Get token from localstorage
	const myInfo = JSON.parse(sessionStorage.getItem('myinfo'));
	const { token } = myInfo;

	req.headers.common['Authorization'] += token;
	return req;
});

export default instance;
