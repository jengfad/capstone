import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Welcome to Vaxmon!</h1>
        <p>What do you want to do?</p>
        <ul>
          <li><a href='https://get.asp.net/'>Login as Patient</a></li>
          <li><a href='https://facebook.github.io/react/'>Login as Internal User</a></li>
          <li><a href='http://getbootstrap.com/'>Go to Validation Page</a></li>
        </ul>
      </div>
    );
  }
}
