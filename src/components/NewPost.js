import React, { useState, useRef } from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import { apiUrl, apiCreate } from '../util/api'
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom"

export default function NewPost() {

    let navigate = useNavigate()
    const [validated, setValidated] = useState(false);
    const [newPost, setNewPost] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [value, setValue] = React.useState();

    const [formInputData, setformInputData] = useState(
        {
            userId: '',
            firstName: '',
            lastName: ''
        }
    );

    const handleSubmit = (event) => {

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);

        
    }
let data = 
    { "firstName": "Daniel",
        "picture": 'https://i.stack.imgur.com/Xk75m.jpg?s=256&g=1',
        "lastName": 'Towel',
        "email": "daniel@gmail.com" 
     }
    fetch('https://dummyapi.io/data/v1/tag/water/post?limit=10', {

        headers: {
            'app-id': '63d2dc1253f3e34389be3346',
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        },
    }).then((response) => response.json())
        .then((json) => console.log(json));

        
    fetch('https://dummyapi.io/data/v1/post/create', {
        method: 'POST',
        body: JSON.stringify({
            title: 'foo',
            body: 'bar',
            userId: 1,
        }),
        headers: {
            'app-id': '63d2dc1253f3e34389be3346',
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => console.log(json));
        
    


    fetch(`${apiUrl}/user/create`, {
        
        method: 'POST',
        withCredentials: true,
        headers: {
            'app-id': '63d2dc1253f3e34389be3346',
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        },
        body: JSON.stringify(
            {data: data}
        )
    })
        .then(response => response.json())
        .then(json => console.log(json))
.catch (err => console.log(err));

    const handleChange = (evnt) => {
        setValue(evnt.target.value);
        const newInput = (data) => ({ ...data, [evnt.target.name]: evnt.target.value })
        setformInputData(newInput)
    }

    const clearData = () => {
        setNewPost(null);
    }

    return (
        <Container>
            <Row className='d-flex justify-content-start'>
                <Col className="col-2">
                    <Button variant="primary" className="btn-block w-100 mt-5 mb-5" onClick={() => navigate("/")}>Go back <BsArrowLeft /></Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form noValidate validated={validated} className="text-light">
                        <Row className="mb-5">
                            <h3>Enter data about owner</h3>
                            <hr />
                            <Form.Group as={Col} md="3" controlId="validationCustom03">
                                <Form.Label>Title</Form.Label>
                                <Form.Select aria-label="Default select example" name="title">
                                    <option >Select title</option>
                                    <option value="mr">Mr</option>
                                    <option value="ms">Ms</option>
                                    <option value="miss">Miss</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} md="3" controlId="validationCustom01">
                                <Form.Label>First name</Form.Label>
                                <Form.Control
                                    onChange={handleChange}
                                    required
                                    type="text"
                                    placeholder="First name"
                                    name="firstName"
                                    value={firstName}

                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="3" controlId="validationCustom02">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control
                                    onChange={handleChange}
                                    required
                                    type="text"
                                    placeholder="Last name"
                                    name="lastName"
                                    value={lastName}
                                // defaultValue="Otto"
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="3" controlId="formFile">
                                <Form.Label>Default file input example</Form.Label>
                                <Form.Control type="file" />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <h3>Enter data about post</h3>
                            <hr />
                            <Form.Group as={Col} md="6" controlId="formFile">
                                <Form.Label>Default file input example</Form.Label>
                                <Form.Control type="file" />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid file.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md="3" controlId="validationCustom04">
                                <Form.Label>Likes</Form.Label>
                                <Form.Control type="text" placeholder="Likes" required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid number.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="3" controlId="validationCustom05">
                                <Form.Label>Tags</Form.Label>
                                <Form.Control type="text" placeholder="Tags" required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid tag.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="12" className="mb-3 mt-5" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Example textarea</Form.Label>
                                <Form.Control as="textarea" rows={3} />
                            </Form.Group>
                        </Row>

                        <Button type="submit" onClick={handleSubmit}>Submit form</Button>
                        <Button type="submit" onClick={clearData}>Clear form</Button>

                    </Form>
                </Col>
            </Row>
        </Container>


    );
}


