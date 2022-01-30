
import React from 'react';
import { Navbar, Container, Nav, NavDropdown} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

function Header() {
    const history = useHistory();
    const datainfo = localStorage.getItem('user-info');
    let userinfo = (datainfo) ? JSON.parse(datainfo) : {};

    const Logout = () => {
        localStorage.clear();
        history.push('/');
    };

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">
                        <img
                            alt=""
                            src="/images/logo-ecom.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        E-Commerce Sidiq
                    </Navbar.Brand>
                    <Nav className="me-auto navbar_wrapper">
                        {   
                            localStorage.getItem('user-info') ? 
                            <>
                                <Link to="/product">Products</Link>
                                <Link to="/">List</Link>
                            </> : 
                            <>
                                <Link to="/login">Login</Link>
                                <Link to="/register">Register</Link>
                                <Link to="/">List</Link>
                            </> 
                        }
                    </Nav>
                    {
                        localStorage.getItem('user-info') ?
                            <Nav>
                                <NavDropdown title={userinfo.name} style={{ color: "white" }}>
                                    <NavDropdown.Item onClick={() => Logout()}>Log Out</NavDropdown.Item>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        : null
                    }
                    
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;
