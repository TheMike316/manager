import React, { Component } from 'react';
import { Card, CardSection, Input, Button } from './common';

class LoginForm extends Component {
  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="email@foobar.com"
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

export default LoginForm;
