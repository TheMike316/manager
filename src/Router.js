import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './Components/LoginForm';
import EmployeeList from './Components/EmployeeList';

const RouterComponent = () => (
    <Router>
      <Scene key="root">
        <Scene key="login" component={LoginForm} title="Please Login" />
        <Scene
          key="employeeList"
          component={EmployeeList}
          title="Employees"
        />
      </Scene>
    </Router>
  );

export default RouterComponent;
