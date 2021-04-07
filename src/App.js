import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import * as actions from './actions/index';
import JobForm from './components/JobForm';
import Control from './components/Control';
import JobList from './components/JobList';

class App extends React.Component {
    
    onDisplayForm = () => {
        this.props.onOpenForm();
        this.props.onEditJob({
            id: '',
            name: '',
            status: false
        });
    }

    render() {
        var { isDisplayForm } = this.props;

        return (
            <div className="container">
                <div className="text-center">
                    <h1>Quản lý công việc</h1>
                    <hr/>
                </div>
                <div className="row">
                    <div className={ isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : '' }>
                        {/* Form */}
                        <JobForm />
                    </div>
                    <div className={ isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12' }>
                        <button type="button" className="btn btn-primary" onClick={ this.onDisplayForm }>
                            <span className="fa fa-plus mr-5"></span>
                            Thêm công việc
                        </button>
                        <Control />
                    {/* List */}
                        <div className="row mt-15">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <JobList />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isDisplayForm: state.isDisplayForm
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onToggleForm : () => {
            dispatch(actions.toggleForm());
        },
        onOpenForm : () => {
            dispatch(actions.openForm());
        },
        onEditJob : (job) => {
            dispatch(actions.editJob(job));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);