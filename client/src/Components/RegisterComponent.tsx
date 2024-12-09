import axios from 'axios';
import React from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';

export default function RegisterComponent() {
    const handleuserRegister = (event: any) => {
        event.preventDefault();
        const { name, username, email, password } = event.target.elements;
        const regex = /^[a-zA-Z0-9_.+-]+[\x40][a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (name.value.length < 3 || username.length < 6 || !regex.test(email.value) || password.value.length < 6) {
            window.alert("Form must be filled out with valid values.")
        } else {
            let request: any = {
                name: name.value,
                username: username.value,
                email: email.value,
                password: password.value,
                isActive: 0
            };
            axios.post(`http://localhost:3200/api/register/`, request).then((response) => {
                window.alert(response.data);
                name.value = "";
                username.value = "";
                email.value = "";
                password.value = "";
            }).catch((err) => console.log(err.message));
        }
    }

    return (
        <Container>
            <h1 className="page-header">Register</h1>
            <section className="h-100">
                <div className="d-flex align-items-center justify-content-between">
                    <div className="col-sm-6 h-100 d-inline-block">
                        <div className=" d-flex align-items-center justify-content-between">
                            <img src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-135.jpg" alt="Login" />
                        </div>
                    </div>
                    <div className="d-flex bg-light p-4 align-items-center justify-content-between">
                        <Form className="isform" onSubmit={handleuserRegister}>
                            <Form.Group className="mb-3" controlId="RegName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    className="rounded-0"
                                    maxLength={50}
                                    name="name"
                                    type="text"
                                    placeholder="Name, Minimum 3 charactor required."
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="regUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    className="rounded-0"
                                    maxLength={50}
                                    name="username"
                                    type="text"
                                    placeholder="User Name, Minimum 6 charactor required."
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="regEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    className="rounded-0"
                                    maxLength={50}
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="regPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    className="rounded-0"
                                    maxLength={50}
                                    name="password"
                                    type="password"
                                    placeholder="Pasword, Minimum 6 charactor required."
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="regSubmit">
                                <div className='d-flex align-items-center justify-content-between'>
                                    <Button type='submit' variant="success" className="rounded-0">Register</Button>
                                </div>
                            </Form.Group>
                            <p>Already have an account? <Link className="link-btn" to="/login">Login here</Link></p>
                        </Form>
                    </div>
                </div>
            </section>
        </Container>
    )
}
