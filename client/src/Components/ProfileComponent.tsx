import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Container,Form } from 'react-bootstrap'
import { Link } from 'react-router-dom';

export default function ProfileComponent() {
const [activeUser, setActiveUser] = useState<any>([]);
    useEffect(() => {
        loadActiveUser();
    }, []);

    const loadActiveUser = () => {
        let isActiveUser = localStorage.getItem("user");
        if (isActiveUser !== null) {
            let request: any = { "email": isActiveUser }
            axios.post("http://localhost:3200/api/checkuser", request)
                .then((response) => {
                    let result = response?.data;
                    if (result.length > 0) {
                        setActiveUser(result);
                    }
                }).catch((err) => console.log(err.message));
        }
    }
    return (
        <Container>
            <h1 className="page-header">Profile</h1>
            {/* <code>{JSON.stringify(activeUser)}</code> */}
            <section className="h-100">
                <div className="d-flex align-items-center justify-content-between">
                    <div className="col-sm-6 h-100 d-inline-block">
                        <div className=" d-flex align-items-center justify-content-between">
                            <img src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-135.jpg" alt="Login" />
                        </div>
                    </div>
                    <div className="d-flex w-100 p-4 align-items-center justify-content-between">
                        <Form className="isform w-100" /*onSubmit={handleuserRegister}*/>
                            <Form.Group className="mb-3" controlId="RegName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    className="rounded-0"
                                    maxLength={50}
                                    name="name"
                                    value={activeUser[0]?.name}
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
                                    value={activeUser[0]?.username}
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
                                    value={activeUser[0]?.email}
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
                                    value={activeUser[0]?.password}
                                    type="password"
                                    placeholder="Pasword, Minimum 6 charactor required."
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="regSubmit">
                                <div className='d-flex align-items-center justify-content-between'>
                                    <Button type='submit' variant="success" className="rounded-0">Save</Button>
                                </div>
                            </Form.Group>
                        </Form>
                    </div>
                </div>
            </section>
        </Container>
    )
}
