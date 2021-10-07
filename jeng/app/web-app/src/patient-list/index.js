const PatientList = ({allPatients}) => {
    return (
        <table>
            <tbody>
                {allPatients.map((patient) => (
                    <tr>
                        <td>{patient.lastName}, {patient.firstName}</td>
                        <td>{patient.region}</td>
                        <td>{patient.certHash}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
 
export default PatientList;