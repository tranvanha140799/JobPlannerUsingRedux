import * as types from './../constants/actionTypes';

var s4 = () => {
    return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
}

var generateId = () => {
    return s4() + s4() + '-' + s4() + s4() + '-' + s4() + s4() + '-' + s4() + s4();
}

var findIndex = (jobs, id) => {
    var result = -1;
    jobs.forEach((job, index) => {
        if(job.id === id)
            result = index;
    });
    return result;
}

var data = JSON.parse(localStorage.getItem('jobs'));
var initialState = data ? data : [];

var myReducer = (state = initialState, action) => {
	var index = -1;

	switch(action.type) {
		case types.LIST_ALL:
			return state;
		case types.SAVE_JOB:
			var job = {
				id: action.job.id,
				name: action.job.name,
				status: action.job.status
			};
			if(!job.id) {
				job.id = generateId();
				state.push(job);
			}
			else {
				index = findIndex(state, job.id);
				state[index] = job;
			}
			localStorage.setItem('jobs', JSON.stringify(state));
			return [...state]; // cú pháp ES6 tránh tham chiếu trùng vùng nhớ
		case types.UPDATE_STATUS:
			index = findIndex(state, action.id);
			var alterJob = {
				id: action.id,
				name: state[index].name,
				status: !state[index].status
			};
			state[index] = alterJob;
			localStorage.setItem('jobs', JSON.stringify(state));
			return [...state];
		case types.DELETE_JOB:
			index = findIndex(state, action.id);
			state.splice(index, 1);
			localStorage.setItem('jobs', JSON.stringify(state));
			return [...state];
		default:
			return state;
	}
};

export default myReducer;