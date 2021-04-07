import React, { Component } from 'react';
import * as actions from './../actions/index';
import { connect } from 'react-redux';

class JobItem extends Component {

    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.job.id);
    }

    deleteJob = () => {
        this.props.onDeleteJob(this.props.job.id);
        this.props.onCloseForm();
    }

    onEditJob = () => {
        this.props.onOpenForm();
        this.props.onEditJob(this.props.job);
    }

	render() {
		var index = this.props.index + 1;
		var job = this.props.job;

		return (
			<tr>
                <td>{ index }</td>
                <td>{ job.name }</td>
                <td className="text-center">
                    <span
                        className={ job.status === true ? 'label label-success' : 'label label-danger' }
                        onClick={ this.onUpdateStatus }>
                        { job.status === true ? 'Kích hoạt' : 'Ẩn' }
                    </span>
                </td>
                <td className="text-center">
                    <button
                        type="button"
                        className="btn btn-warning"
                        onClick={ this.onEditJob }>
                        <span className="fa fa-pencil mr-5">Sửa</span>
                    </button>&nbsp;
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={ this.deleteJob }>
                        <span className="fa fa-trash mr-5">Xoá</span>
                    </button>
                </td>
            </tr>
		);
	}
}

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onUpdateStatus : (id) => {
            dispatch(actions.updateStatus(id));
        },
        onDeleteJob : (id) => {
            dispatch(actions.deleteJob(id));
        },
        onCloseForm : () => {
            dispatch(actions.closeForm());
        },
        onOpenForm : () => {
            dispatch(actions.openForm());
        },
        onEditJob : (job) => {
            dispatch(actions.editJob(job));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(JobItem);