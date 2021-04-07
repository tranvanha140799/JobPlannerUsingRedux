import * as types from './../constants/actionTypes';

export const listAll = () => {
	return {
		type: types.LIST_ALL
	};
};

export const saveJob = (job) => {
	return {
		type: types.SAVE_JOB,
		job: job
	};
};

export const toggleForm = () => {
	return {
		type: types.TOGGLE_FORM
	};
};

export const closeForm = () => {
	return {
		type: types.CLOSE_FORM
	};
};

export const openForm = () => {
	return {
		type: types.OPEN_FORM
	};
};

export const updateStatus = (id) => {
	return {
		type: types.UPDATE_STATUS,
		id: id
	};
};

export const deleteJob = (id) => {
	return {
		type: types.DELETE_JOB,
		id: id
	};
};

export const editJob = (job) => {
	return {
		type: types.EDIT_JOB,
		job: job
	};
};

export const filterJob = (filter) => {
	return {
		type: types.FILTER_TABLE,
		filter : filter
	};
};

export const searchJob = (keyword) => {
	return {
		type: types.SEARCH,
		keyword: keyword
	};
};

export const sortJob = (sort) => {
	return {
		type: types.SORT,
		sort: sort
	};
};