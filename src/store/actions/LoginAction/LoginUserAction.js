import axios from 'axios/index';
import { LOGIN_USER } from '../ActionType';
// REACT_APP_API_URL=
// SKIP_PREFLIGHT_CHECK=true

export function getmyInfoApi() {
	return async function (dispatch) {
		const myInfo = JSON.parse(sessionStorage.getItem('myinfo'));
		await axios
			.get(
				'http://167.172.166.24:3000/api/v1/users/info/userId/' +
				myInfo.userId,
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${myInfo.token}`,
					},
				}
			).then((results) => {
				dispatch({
					type: LOGIN_USER,
					payload: results.data.data,
				});
			})
			.catch((err) => {
					// dispatch({
					// type: LOGIN_USER,
					// payload: results.data.data,
				// });
			});
	};
}

export function getmyInfoAction() {
	return async function (dispatch) {
		const data = sessionStorage.getItem('myinfo');
		dispatch({
			type: LOGIN_USER,
			payload: JSON.parse(data),
		});
	};
}

export function getmyInfo() {
	const data = sessionStorage.getItem('myinfo');
	return JSON.parse(data);
}
