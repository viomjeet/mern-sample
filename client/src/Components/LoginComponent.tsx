import axios from 'axios';
import React, { useEffect } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom';

export default function LoginComponent() {
    const handleUserLogin = (event: any) => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        const regex = /^[a-zA-Z0-9_.+-]+[\x40][a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!regex.test(email.value) || password.value.length < 6) {
            window.alert("Form must be filled out with valid values.")
        } else {
            let request: any = {
                email: email.value,
                password: password.value,
            };
            axios.post(`http://localhost:3200/api/userLogin`, request).then((response) => {
                if (response.data.includes("Invalid")) {
                    window.alert(response.data);
                } else {
                    email.value = "";
                    password.value = "";
                    setTimeout(() => { window.location.href = '/'; }, 10)
                    localStorage.setItem("user", response.data)
                }
            }).catch((err) => window.alert(err.message));
        }
    }

    useEffect(() => {
        if (localStorage.getItem("user") !== null) {
            window.location.href = '/'
        }
    })

    return (
        <Container>
            <h1 className="page-header">{localStorage.getItem("user") === null ? "Login" : "-----"}</h1>
            {localStorage.getItem("user") === null && (
                <section className="h-100">
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="col-sm-6 h-100 d-inline-block">
                            <div className=" d-flex align-items-center justify-content-between">
                                <img src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-135.jpg" alt="Login" />
                            </div>
                        </div>
                        <div className="d-flex bg-light p-4 align-items-center justify-content-between">
                            <Form className="isform" onSubmit={handleUserLogin}>
                                <Form.Group className="mb-3" controlId="loginEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        autoComplete="new-email"
                                        className="rounded-0"
                                        maxLength={50}
                                        name="email"
                                        type="email"
                                        placeholder="Email"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="loginPassword">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        autoComplete="new-password"
                                        className="rounded-0"
                                        maxLength={50}
                                        name="password"
                                        type="password"
                                        placeholder="Pasword"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="loginSubmit">
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <a className="text-muted" href="#!">Forgot password?</a>
                                        <Button type="submit" variant="success" className="d-flex justify-content-center rounded-0">
                                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m10.998 16 5-4-5-4v3h-9v2h9z"></path><path d="M12.999 2.999a8.938 8.938 0 0 0-6.364 2.637L8.049 7.05c1.322-1.322 3.08-2.051 4.95-2.051s3.628.729 4.95 2.051S20 10.13 20 12s-.729 3.628-2.051 4.95-3.08 2.051-4.95 2.051-3.628-.729-4.95-2.051l-1.414 1.414c1.699 1.7 3.959 2.637 6.364 2.637s4.665-.937 6.364-2.637C21.063 16.665 22 14.405 22 12s-.937-4.665-2.637-6.364a8.938 8.938 0 0 0-6.364-2.637z"></path></svg>
                                            Login
                                        </Button>
                                    </div>
                                </Form.Group>
                                <p>Don't have an account? <Link className="link-btn" to="/register">Register here</Link></p>
                            </Form>
                        </div>
                    </div>
                </section>
            )}
        </Container>
    )
}
