import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { URL_API } from '../config/constants';
import Header from './Header';

function Register() {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let history = useHistory();

    useEffect(() => {
        if(localStorage.getItem('user-info')){
            history.push('/');
        }
    }, []);

    const handleSubmit = async(e) => {
        e.preventDefault();

        const data = {
            name : name,
            password : password,
            email : email
        };

        const result = await fetch(URL_API+'register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept" : "application/json"
            },
            body : JSON.stringify(data)
        });

        const check = await result.json();
        history.push('/');
        Swal.fire({
            title: 'Successfuly!',
            text: result.message,
            icon: 'success',
            timer: 2000
        });

        localStorage.setItem('user-info', JSON.stringify(check.data));
    };
    return (
        <div>
            <Header />

            <Container>
                <Row className='mt-3'>
                    <Col md={4}>
                    </Col>
                    <Col md={4} className='justify-content-center'>
                        <h1 className='text-center'>Register</h1>
                        <Form onSubmit={(e) => handleSubmit(e)}>
                            <Form.Group className="mb-3">
                                <Form.Label>Full Name</Form.Label>
                                <input className="form-control" onChange={(e) => setName(e.target.value)} value={name} type="name" placeholder="Enter fullname" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <input className="form-control" onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <input className="form-control" onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" />
                            </Form.Group>
                            <Button variant="primary" type="submit" className='w-100'>
                                Daftar
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

export default Register;
