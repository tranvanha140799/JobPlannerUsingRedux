import * as types from './../constants/actionTypes';

var initialState = {
	name: '',
	status: -1
};

var myReducer = (state = initialState, action) => {
	switch(action.type) {
		case types.FILTER_TABLE:
			action.filter.status = Number(action.filter.status);
			return action.filter;
		default:
			return state;
	}
};

export default myReducer;