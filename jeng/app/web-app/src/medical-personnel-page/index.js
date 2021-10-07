import { useEffect, useState } from "react";
import PatientList from "../patient-list";

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
            {allPatients.length > 0 && <PatientList allPatients={allPatients} />}
        </div>
    );
}
 
export default MedicalPersonnelPage;