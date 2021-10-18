import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import CertificateList from './components/CertificateList';
import './custom.css'
import CertificateUpload from './components/CertificateUpload';
import RegisterPatient from './components/RegisterPatient';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/upload-cert' component={CertificateUpload} />
        <Route path='/view-cert' component={CertificateList} />
        <Route path='/register-patient' component={RegisterPatient} />
      </Layout>
    );
  }
}
