import _ from 'lodash';
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import { Card, CardSection, Button, Spinner, Confirm } from './common';
import {
  employeeUpdate,
  employeeFormUpdate,
  employeeDelete
 } from '../actions';
import EmployeeForm from './EmployeeForm';

class EmployeeEdit extends Component {
  state = { showModal: false };

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

  onTextPress() {
    const { phone, shift } = this.props;

    Communications.text(phone, ` Your upcoming shift is on ${shift}`);
  }

  onAccept() {
    this.props.employeeDelete({ uid: this.props.employee.uid });
    this.setState({ ...this.state, showModal: false });
  }

  onDecline() {
    this.setState({ ...this.state, showModal: false });
  }

  renderButtons() {
    if (this.props.loading) {
      return (
        <CardSection>
          <Spinner size="large" />
        </CardSection>
      );
    }
    return (
      <View>
        {this.renderSaveButton()}
        {this.renderTextButton()}
        {this.renderFireButton()}
      </View>
    );
  }

  renderSaveButton() {
    return (
      <CardSection>
        <Button onPress={this.onButtonPress.bind(this)}>
          Save Changes
        </Button>
      </CardSection>
    );
  }

  renderTextButton() {
    return (
      <CardSection>
        <Button onPress={this.onTextPress.bind(this)}>
          Text Schedule
        </Button>
      </CardSection>
    );
  }

  renderFireButton() {
    return (
      <CardSection>
        <Button
          onPress={() =>
            this.setState({
              ...this.state,
              showModal: !this.state.showModal
            })}
        >
          Fire Employee
        </Button>
      </CardSection>
    );
  }

  render() {
    return (
      <Card>
        <EmployeeForm />
        {this.renderButtons()}
        <Confirm
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
        >
          Are you sure you want to fire this employee?
        </Confirm>
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
  employeeUpdate,
  employeeDelete
})(EmployeeEdit);
