import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Picker } from 'react-native';
import { CardSection, Input } from './common';
import { employeeFormUpdate } from '../actions';

class EmployeeForm extends Component {
  render() {
    return (
      <View>
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
      </View>
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
  const { name, phone, shift } = state.employeeForm;

  return { name, phone, shift };
};

export default connect(mapStateToProps, { employeeFormUpdate })(EmployeeForm);
