import React, { Component } from 'react';
import { Picker, Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { employeeFormUpdate, employeeCreate } from '../actions';

class EmployeeCreate extends Component {
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
        <CardSection>
          <Input
            label="Name"
            placeholder="Jane"
            value={this.props.name}
            onChangeText={
              value => this.props.employeeFormUpdate({ prop: 'name', value })
            }
          />
        </CardSection>

        <CardSection>
          <Input
            label="Phone"
            placeholder="0043 666 / 333 44 55"
            value={this.props.phone}
            onChangeText={
              value => this.props.employeeFormUpdate({ prop: 'phone', value })
            }
          />
        </CardSection>

        <CardSection style={styles.pickerCardSection}>
          <Text style={styles.pickerLabel}>Shift</Text>
          <Picker
            selectedValue={this.props.shift}
            onValueChange={
              value => this.props.employeeFormUpdate({ prop: 'shift', value })
            }
          >
            <Picker.Item label="Monday" value="Monday" />
            <Picker.Item label="Tuesday" value="Tuesday" />
            <Picker.Item label="Wednesday" value="Wednesday" />
            <Picker.Item label="Thursday" value="Thursday" />
            <Picker.Item label="Friday" value="Friday" />
            <Picker.Item label="Saturday" value="Saturday" />
            <Picker.Item label="Sunday" value="Sunday" />
          </Picker>
        </CardSection>

        {this.renderButton()}

      </Card>
    );
  }
}

const styles = {
  pickerLabel: {
    fontSize: 18,
    paddingLeft: 20
  },
  pickerCardSection: {
    flexDirection: 'column'
  }
};

const mapStateToProps = (state) => {
  const { name, phone, shift, loading } = state.employeeForm;

  return { name, phone, shift, loading };
};

export default connect(mapStateToProps, {
  employeeFormUpdate,
  employeeCreate
})(EmployeeCreate);
