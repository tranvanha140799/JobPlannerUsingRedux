import { combineReducers } from 'redux';
import jobs from './jobs';
import isDisplayForm from './isDisplayForm';
import jobEditing from './jobEditing';
import filterTable from './filterTable';
import search from './search';
import sort from './sort';

const myReducer = combineReducers({
	jobs: jobs,
	isDisplayForm: isDisplayForm,
	jobEditing: jobEditing,
	filterTable: filterTable,
	search: search,
	sort: sort
});

export default myReducer;