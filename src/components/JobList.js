import React, { Component } from 'react';
import JobItem from './JobItem';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class JobList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterName: '',
            filterStatus: -1 // tất cả: -1; kích hoạt: 1; ẩn: 0
        };
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        var filter = {
            name: name === 'filterName' ? value : this.state.filterName,
            status: name === 'filterStatus' ? value : this.state.filterStatus
        };
        this.props.onFilterTable(filter);
        this.setState({
            [name]: value
        });
    }

	render() {
		var {jobs, filterTable, keyword, sort } = this.props;
        var { filterName, filterStatus } = this.state;
        
        // search on table
        if(filterTable.name) {
            jobs = jobs.filter((job) => {
                return job.name.toLowerCase().indexOf(filterTable.name.toLowerCase()) !== -1;
            });
        }

        // seach
        if(keyword) {
            jobs = jobs.filter((job) => {
                return job.name.toLowerCase().indexOf(keyword) !== -1;
            });
            // jobs = _.filter(jobs, (job) => {
            //     return job.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
            // });
        }

        // filter table
        jobs = jobs.filter((job) => {
            if(filterTable.status === -1)
                return job;
            else
                return job.status === (filterTable.status === 1 ? true : false);
        });

        // sort
        if(sort.by === 'name') {
            jobs.sort((a, b) => {
                if(a.name > b.name)
                    return sort.value;
                else if(a.name < b.name)
                    return -sort.value;
                else
                    return 0;
            });
        }
        else {
            jobs.sort((a, b) => {
                if(a.status > b.status)
                    return -sort.value;
                else if(a.status < b.status)
                    return sort.value;
                else
                    return 0;
            });
        }
		
        var elementJobs = jobs.map((job, index) => {
			return <JobItem key={ job.id } index={ index } job={ job } onUpdate={ this.props.onUpdate }/>
		});

		return (
			<table className="table table-bordered table-hover mt-15">
                <thead>
                    <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">Tên</th>
                        <th className="text-center">Trạng thái</th>
                        <th className="text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>
                            <input
                                type="text"
                                className="form-control"
                                name="filterName"
                                value={ filterName }
                                onChange={ this.onChange }
                            />
                        </td>
                        <td>
                            <select
                                name="filterStatus"
                                className="form-control"
                                value={ filterStatus }
                                onChange={ this.onChange }
                                >
                                <option value={-1}>Tất cả</option>
                                <option value={0}>Ẩn</option>
                                <option value={1}>Kích hoạt</option>
                            </select>
                        </td>
                        <td></td>
                    </tr>
                    { elementJobs }
                </tbody>
            </table>
		);
	}
}

const mapStatetoProps = (state) => {
    return {
        jobs: state.jobs,
        filterTable: state.filterTable,
        keyword: state.search,
        sort: state.sort
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onFilterTable : (filter) => {
            dispatch(actions.filterJob(filter));
        }
    };
};

export default connect(mapStatetoProps, mapDispatchToProps)(JobList);