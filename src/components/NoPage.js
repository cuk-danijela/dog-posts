import React from 'react';
import { BsArrowLeft } from "react-icons/bs";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom"


const NoPage = () => {
    let navigate = useNavigate()
    return (
        <Container>
            <Row className='d-flex justify-content-start'>
                <Col className="col-2">
                    <Button variant="primary" className="btn-block w-100 mt-5 mb-5" onClick={() => navigate("/")}>Go back to Home page<BsArrowLeft /></Button>
                </Col>
            </Row>
            <Row>
                <h1>404 PAGE</h1>
                <h3 className='text-light'>Sorry, wrong page! Upsss..</h3>
            </Row>
        </Container>
    )
}

export default NoPage;