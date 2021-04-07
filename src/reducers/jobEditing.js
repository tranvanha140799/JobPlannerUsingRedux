import * as types from './../constants/actionTypes';

var initialState = {
	id: '',
	name: '',
	status: false
}; // giá trị của state là 1 object

var myReducer = (state = initialState, action) => {
	switch(action.type) {
		case types.EDIT_JOB:
			state = action.job;
			return state;
		default:
			return state;
	}
};

export default myReducer;