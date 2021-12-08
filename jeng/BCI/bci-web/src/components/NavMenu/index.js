import React from 'react';
import { useState, useEffect } from 'react';
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
    const [showRoleLinks, setShowRoleLinks] = useState(true);

    const toggleNavbar = () => {
        setCollapsed(!collapsed);
    }

    useEffect(() => {
        if (window.location.href == "http://localhost:3000/" 
            || window.location.href.indexOf("login") === -1
            || window.location.href.indexOf("validate") === -1) {
            setShowRoleLinks(false);
        }
    }, []);

    const role = window.localStorage.getItem("role");
    const isInternal = role === ROLE.internal.name;
    const isPatient = role === ROLE.patient.name;
    const hasRole = isPatient || isInternal;

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
                    {
                        !showRoleLinks &&
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
                                hasRole &&
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/logout">Logout</NavLink>
                                </NavItem>
                            }
                            </ul>
                        </Collapse>
                    }
                </Container>
            </Navbar>
        </header>
    );
}
 
export default NavMenu;