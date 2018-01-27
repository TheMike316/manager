import React, { Component } from 'react';
import { connect } from 'react-redux';
import { emailChanged } from '../actions';
import { Card, CardSection, Input, Button } from './common';

class LoginForm extends Component {
  onEmailChange(text) {
    console.log(text);
    console.log(this.props);
    console.log(emailChanged);
    this.props.emailChanged(text);
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
          secureTextEntry
        />
        </CardSection>

        <CardSection>
          <Button>
            Login
          </Button>
        </CardSection>

      </Card>
    );
  }
}

const mapStateToProps = state => (
  {
    email: state.auth.email
  }
);

export default connect(mapStateToProps, { emailChanged })(LoginForm);
