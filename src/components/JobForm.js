import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class JobForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            status: false
        };
    }

    componentDidMount() { // Hàm lifecycle chỉ chạy 1 lần duy nhất khi form được mở lên
        // console.log(this.props.jobEditing);
        if(this.props.jobEditing && this.props.jobEditing.id !== null) {
            this.setState({
                id: this.props.jobEditing.id,
                name: this.props.jobEditing.name,
                status: this.props.jobEditing.status
            });
        }
        else {
            this.onClear();
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) { // Hàm lifecycle chạy liên tục khi form vẫn còn được mở (đang dần dần bị loại bỏ)
        if(nextProps && nextProps.jobEditing) {
            this.setState({
                id: nextProps.jobEditing.id,
                name: nextProps.jobEditing.name,
                status: nextProps.jobEditing.status
            });
        }
    }

    onCloseForm = () => {
        this.props.onCloseForm();
    }

    onClear = () => {
        this.setState({
            id: '',
            name: '',
            status: false
        });
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if(name === 'status')
            value = target.value === 'true' ? true : false;
        this.setState({
            [name] : value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSaveJob(this.state);
        // Sau khi submit thành công => clear các trường & đóng forms
        this.onClear();
        this.onCloseForm();
    }

    render() {
        var { id } = this.state;

        if(!this.props.isDisplayForm)
            return '';
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        { id !== '' ? 'Cập nhật công việc' : 'Thêm công việc' }
                        <span
                            className="fa fa-times-circle text-right"
                            onClick={ this.onCloseForm }>
                        </span>
                    </h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={ this.onSubmit }>
                        <div className="form-group">
                            <label>Tên: </label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={ this.state.name }
                                onChange={ this.onChange }/>
                        </div>
                        <div className="form-group">
                            <label>Trạng thái: </label>
                            <select
                                className="form-control"
                                name="status"
                                value={ this.state.status }
                                onChange={ this.onChange }>
                                <option value={ true }>Kích hoạt</option>
                                <option value={ false }>Ẩn</option>
                            </select>
                            <br/>
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="btn btn-success"
                                    >
                                    <span className="fa fa-plus mr-5"></span>
                                    Lưu lại
                                </button>&nbsp;
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={ this.onClear }>
                                    <span className="fa fa-close mr-5"></span>
                                    Huỷ bỏ
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isDisplayForm: state.isDisplayForm,
        jobEditing: state.jobEditing
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSaveJob : (job) => {
            dispatch(actions.saveJob(job));
        },
        onCloseForm : () => {
            dispatch(actions.closeForm());
        },
        onEditJob : (id) => {
            dispatch(actions.editJob(id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(JobForm);