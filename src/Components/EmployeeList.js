import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import { employeesFetch } from '../actions';
import { CardSection, Spinner } from './common';
import EmployeeListItem from './EmployeeListItem';

class EmployeeList extends Component {
  componentWillMount() {
    this.props.employeesFetch();
  }

  renderRow(employee) {
    return <EmployeeListItem employee={employee.item} />;
  }

  render() {
    if (this.props.loading) {
      return (
        <CardSection>
          <Spinner size="large" />
        </CardSection>
      );
    }
    return (
      <FlatList
        data={this.props.employees}
        keyExtractor={(employee) => employee.uid}
        renderItem={this.renderRow}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { loading, employees } = state.employees;

  return { loading, employees };
};

export default connect(mapStateToProps, { employeesFetch })(EmployeeList);
