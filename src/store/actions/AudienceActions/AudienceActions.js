import axios from '../../../Utils/axios';
import * as ACTION_TYPES from '../ActionType';
import * as API_ROUTES from '../../../Utils/apiRoutes';

export const getAudience = (userId) => {
	return async (dispatch) => {
		dispatch(getAudienceStart());
		try {
			//Make an API call and await the result
			const response = await axios.get(API_ROUTES.getAudienceList(userId));
			console.log(response);
			//dispatch success action
			dispatch(getAudienceSuccess(response.data.data));
		} catch (err) {
			//dispatch fail action
			console.log(err);
			dispatch(getAudienceFail(err));
		}
	};
};

const getAudienceStart = () => {
	return {
		type: ACTION_TYPES.GET_AUDIENCE_START,
	};
};

const getAudienceSuccess = (data) => {
	return {
		type: ACTION_TYPES.GET_AUDIENCE_SUCCESS,
		payload: data,
	};
};

const getAudienceFail = (error) => {
	return {
		type: ACTION_TYPES.GET_AUDIENCE_FAIL,
		payload: error,
	};
};
