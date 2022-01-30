import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import Header from './Header';
import {useHistory} from 'react-router-dom';
import Swal from 'sweetalert2';
import { URL_API } from '../config/constants';

function Login() {
    let history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            history.push('/');
        }
    }, []);

    const handleLogin = async(e) => {
        e.preventDefault();
        const data = {'email':email, 'password':password};

        let result = await fetch(URL_API+'login', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            },
            body: JSON.stringify(data)
        });

        result = await result.json();
        if (result.status === 'success') {
            localStorage.setItem('user-info', JSON.stringify(result.data));
            history.push('/');
            Swal.fire({
                title: 'Successfuly!',
                text: result.message,
                icon: 'success',
                timer: 2000
            });

        } else {
            Swal.fire({
                title: 'Error!',
                text: result.message,
                icon: 'error',
                timer: 2000
            });
        }
        
    };
    return (
        <div>
            <Header />

            <Container>
                <Row className='mt-3'>
                    <Col md={4}>
                    </Col>
                    <Col md={4} className='justify-content-center'>
                        <h1 className='text-center'>Login</h1>
                        <Form onSubmit={(e) => handleLogin(e)}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <input className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <input className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group>
                            <Button variant="primary" type="submit" className='w-100'>
                                Submit
                            </Button>
                        </Form>
                    </Col>
                    <Col md={4}>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Login;
