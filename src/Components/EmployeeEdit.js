import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import { Card, CardSection, Button, Spinner, Confirm } from './common';
import { employeeUpdate, employeeFormUpdate } from '../actions';
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

  renderSaveButton() {
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

  onAccept() {

  }

  onDecline() {
    this.setState({ ...this.state, showModal: false });
  }

  render() {
    return (
      <Card>
        <EmployeeForm />
        {this.renderSaveButton()}
        <CardSection>
          <Button onPress={this.onTextPress.bind(this)}>
            Text Schedule
          </Button>
        </CardSection>

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
  employeeUpdate
})(EmployeeEdit);
