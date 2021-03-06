import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { ROLE } from "../../constants/role";

const Login = () => {

    const history = useHistory();
    const { role } = useParams();
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    
    const onInputChange = e => {
      setUser({ ...user, [e.target.name]: e.target.value });
    };

    const { email, password } = user;

    const routeToPage = (data) => {
        if (role === ROLE.patient.name) {
            history.push(`/patient-page/${data.ID}`);
        } else if (role === ROLE.internal.name) {
            history.push(`/upload-cert`);
        }
    }

    const submitRecord = async (e) => {
        const model = JSON.parse(JSON.stringify(user));
        e.preventDefault();
        e.target.reset();
        
        if (role === ROLE.patient.name) {
            model["roleId"] = 1
        } else if (role === ROLE.internal.name) {
            model["roleId"] = 2
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(model)
        };
        
        const response = await fetch('/api/login', requestOptions);
        console.log('response', response);
        const data = await response.json();

        if (data !== null) {
            window.localStorage.setItem('userId', data.ID);
            window.localStorage.setItem('role', role);
            routeToPage(data);
        }
    }

    return (
        <div className="my-4">
            <div className="card">
                <div className="card-body">
                    <h2>Login</h2>
                    <form onSubmit={submitRecord} className="w-50 mt-4">
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" className="form-control mb-4"
                                name="email" value={email}
                                onChange={e => onInputChange(e)}/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control mb-4"
                                name="password" value={password}
                                onChange={e => onInputChange(e)}/>
                        </div>
                        <button type="submit" className="btn btn-primary mt-4">Log In</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
 
export default Login;