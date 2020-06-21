import * as ACTION_TYPES from '../../actions/ActionType';

const initialState = {
	isLoading: false,
	error: null,
	audienceList: [],
};

const AudienceReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPES.GET_AUDIENCE_START:
			return {
				...state,
				isLoading: true,
				audienceList: [],
				error: null,
			};
		case ACTION_TYPES.GET_AUDIENCE_SUCCESS:
			return {
				...state,
				isLoading: false,
				audienceList: action.payload,
			};
		case ACTION_TYPES.GET_AUDIENCE_FAIL:
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default AudienceReducer;
