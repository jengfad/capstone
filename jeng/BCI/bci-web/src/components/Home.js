import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Welcome to Vaxmon!</h1>
        <p>What do you want to do?</p>
        <ul>
          <li><a href='/login/patient'>Login as Patient</a></li>
          <li><a href='/register/patient'>Register Patient</a></li>
          <li><a href='/validate/summary-code'>Validate Summary Code</a></li>
          <li><a href='/validate/cert-file'>Validate Vaccine Certificate File</a></li>
        </ul>
      </div>
    );
  }
}
