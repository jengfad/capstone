const PatientList = ({allPatients}) => {
    return (
        <div className="container">
            <h2 className="my-3 text-center">Patients List</h2>
            <table className="table table-striped">
                <thead className="thead-primary">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Region</th>
                        <th>Certificate Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {allPatients.map((patient) => (
                        <tr>
                            <td>{patient.id}</td>
                            <td>{patient.lastName}, {patient.firstName}</td>
                            <td>{patient.region}</td>
                            <td className="d-flex">
                                <button className="btn btn-link p-0">View</button>
                                <div className="px-1"></div>
                                <button className="btn btn-link p-0">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
 
export default PatientList;