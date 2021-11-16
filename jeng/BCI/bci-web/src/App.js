import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import CertificateList from './components/CertificateList';
import './custom.css'
import CertificateUpload from './components/CertificateUpload';
import RegisterPatient from './components/RegisterPatient';
import CertificateView from './components/CertificateView';
import PatientPage from './components/PatientPage';
import SummaryCodeScan from './components/SummaryCodeScan';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/upload-cert' component={CertificateUpload} />
        <Route path='/cert-list' component={CertificateList} />
        <Route path='/register-patient' component={RegisterPatient} />
        <Route path='/view-cert' component={CertificateView} />
        <Route path='/patient-page' component={PatientPage} />
        <Route path='/scan-summary-code' component={SummaryCodeScan} />
      </Layout>
    );
  }
}
