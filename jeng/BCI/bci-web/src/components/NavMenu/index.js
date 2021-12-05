import React from 'react';
import { useState } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './style.scss';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faShieldVirus } from "@fortawesome/free-solid-svg-icons";
import { ROLE } from "../../constants/role";

library.add(faShieldVirus);

const NavMenu = () => {
    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => {
        setCollapsed(!collapsed);
    }

    const role = window.localStorage.getItem("role");
    const isInternal = role === ROLE.internal.name;
    const isPatient = role === ROLE.patient.name;

    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                <Container>
                    <NavbarBrand tag={Link} to="/">
                        <div className="d-flex align-items-center">
                            <FontAwesomeIcon icon="shield-virus" />
                            <div className="title-label">VaxMon</div>
                        </div>
                    </NavbarBrand>
                    <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                    <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
                        <ul className="navbar-nav flex-grow">
                        {
                            isInternal &&
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/upload-cert">Upload Certificate</NavLink>
                            </NavItem>
                        }
                        {
                            isPatient &&
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/patient-page">Patient Page</NavLink>
                            </NavItem>
                        }
                        {
                            (isPatient || isInternal) &&
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/logout">Logout</NavLink>
                            </NavItem>
                        }
                        
                        {/* <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/register-patient">Register Patient</NavLink>
                        </NavItem>
                        
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/scan-summary-code">Scan Summary Code</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/validate-cert">Validate Certificate</NavLink>
                        </NavItem> */}
                        </ul>
                    </Collapse>
                </Container>
            </Navbar>
        </header>
    );
}
 
export default NavMenu;