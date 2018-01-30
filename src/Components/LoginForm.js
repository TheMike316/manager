import React, { Component } from 'react';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button } from './common';

class LoginForm extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;

    this.props.loginUser({ email, password });
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="email@foobar.com"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
        </CardSection>

        <CardSection>
        <Input
          label="Password"
          placeholder="passwerd"
          onChangeText={this.onPasswordChange.bind(this)}
          value={this.props.password}
          secureTextEntry
        />
        </CardSection>

        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Login
          </Button>
        </CardSection>

      </Card>
    );
  }
}

const mapStateToProps = state => (
  {
    email: state.auth.email,
    password: state.auth.password
  }
);

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser
})(LoginForm);
