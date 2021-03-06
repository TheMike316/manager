import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardSection, Button, Spinner } from './common';
import { employeeCreate, clearEmployeeForm } from '../actions';
import EmployeeForm from './EmployeeForm';

class EmployeeCreate extends Component {
  componentWillMount() {
    this.props.clearEmployeeForm();
  }

  onButtonPress() {
    const { name, phone, shift } = this.props;

    this.props.employeeCreate({ name, phone, shift: shift || 'Monday' });
  }

  renderButton() {
    if (this.props.loading) {
      return (
        <CardSection>
          <Spinner size="large" />
        </CardSection>
      );
    }

    return (
      <CardSection>
        <Button onPress={this.onButtonPress.bind(this)}>
          Create
        </Button>
      </CardSection>
    );
  }

  render() {
    return (
      <Card>
        <EmployeeForm {...this.props} />
        {this.renderButton()}
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, phone, shift, loading } = state.employeeForm;

  return { name, phone, shift, loading };
};

export default connect(mapStateToProps, {
  employeeCreate,
  clearEmployeeForm
})(EmployeeCreate);
