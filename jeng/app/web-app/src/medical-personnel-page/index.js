import { useEffect, useState } from "react";
import PatientList from "../patient-list";
import CertificateView from "../certificate-view";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const MedicalPersonnelPage = () => {
    const [allPatients, setAllPatients] = useState([]);

    useEffect(() => {
        const fetchPatients = async () => {
            const data = await fetch("/data/patients.json");
            const patients = await data.json();
            setAllPatients(patients);
        };
        fetchPatients();
    }, []);
    
    return (
        <div>
            <Router>
                <Switch>
                <Route path="/med-admin/view-certificate/:certHash">
                    <CertificateView />
                </Route>
                <Route path="/med-admin/">
                    <PatientList allPatients={allPatients} />
                </Route>
                </Switch>
            </Router>
        </div>
    );
}
 
export default MedicalPersonnelPage;