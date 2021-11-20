import { useState } from "react";
import axios from "axios";

const RegisterPatient = () => {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        address: "",
        birthdate: null
    });
    
    const onInputChange = e => {
      setUser({ ...user, [e.target.name]: e.target.value });
    };

    const { firstName, lastName, email, password, address, birthdate } = user;

    const submitRecord = async (e) => {
        e.preventDefault();
        e.target.reset();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        };

        fetch('api/register-patient', requestOptions)
            .then(response => {
                alert('Thank you for registering! You will be redirected to home page.');
            });
    }

    return (
        <div className="my-4">
            <h2>Register</h2>
            <form onSubmit={submitRecord} className="w-50 mt-4">
                <div class="form-group">
                    <label>First Name</label>
                    <input type="text" class="form-control mb-4"
                        name="firstName" value={firstName}
                        onChange={e => onInputChange(e)}/>
                </div>
                <div class="form-group">
                    <label>Last Name</label>
                    <input type="text" class="form-control mb-4"
                        name="lastName" value={lastName}
                        onChange={e => onInputChange(e)}/>
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="text" class="form-control mb-4"
                        name="email" value={email}
                        onChange={e => onInputChange(e)}/>
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" class="form-control mb-4"
                        name="password" value={password}
                        onChange={e => onInputChange(e)}/>
                </div>
                <div class="form-group">
                    <label>Address</label>
                    <input type="text" class="form-control mb-4"
                        name="address" value={address}
                        onChange={e => onInputChange(e)}/>
                </div>
                <div class="form-group">
                    <label>Birthdate (mm/dd/yyyy)</label>
                    <input type="text" class="form-control mb-4"
                        name="birthdate" value={birthdate}
                        onChange={e => onInputChange(e)}/>
                </div>
                <button type="submit" class="btn btn-primary mt-4">Save</button>
            </form>
        </div>
    );
}
 
export default RegisterPatient;