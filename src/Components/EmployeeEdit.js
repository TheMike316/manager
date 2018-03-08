import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardSection, Button, Spinner } from './common';
import { employeeUpdate, employeeFormUpdate } from '../actions';
import EmployeeForm from './EmployeeForm';

class EmployeeEdit extends Component {
  componentWillMount() {
    _.each(this.props.employee, (value, prop) => {
      this.props.employeeFormUpdate({ prop, value });
    });
  }


  onButtonPress() {
    const { name, phone, shift } = this.props;

    this.props.employeeUpdate({
      name,
      phone,
      shift,
      uid: this.props.employee.uid
    });
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
          Save Changes
        </Button>
      </CardSection>
    );
  }

  render() {
    return (
      <Card>
        <EmployeeForm />
        {this.renderButton()}
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { uid, name, phone, shift } = state.employeeForm;

  return { uid, name, phone, shift };
};

export default connect(mapStateToProps, {
  employeeFormUpdate,
  employeeUpdate
})(EmployeeEdit);
