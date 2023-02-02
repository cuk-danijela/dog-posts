import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Spinner, Card, Image, Badge } from 'react-bootstrap';
import { useNavigate, useParams, Link } from "react-router-dom"
import { BsArrowLeft } from "react-icons/bs";
import { apiUrl, apiKey } from '../util/api';
import someData from '../data'


export default function Post() {

    const navigate = useNavigate()

    const [post, setPost] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const { postId } = useParams();

    // const getFormattedDate = (dateStr) => {
    //     const date = new Date(dateStr);
    //     return date.toLocaleString();
    // }

    // useEffect(() => {
    //     const getPostById = async () => {
    //         try {
    //             const res = await fetch(`${apiUrl}/post/${postId}`, {
    //                 method: "GET",
    //                 withCredentials: true,
    //                 headers: {
    //                     'app-id': apiKey,
    //                     'Accept': 'application/json',
    //                     'Content-Type': 'multipart/form-data'
    //                 },
    //             });
    //             if (!res.ok) throw new Error("Could not found!");
    //             const data = await res.json();
    //             setPost(data);
    //             setIsLoading(false);
    //         } catch (error) {
    //             setIsLoading(false);
    //             setError(error.message);
    //         }
    //     };

    //     getPostById();
    // }, [postId]);


    return (
        <Container>
            <Row className='d-flex justify-content-start'>
                <Col className="col-2">
                    <Button variant="primary" className="btn-block w-100 mt-5 mb-5" onClick={() => navigate("/")}><BsArrowLeft /> Go back </Button>
                </Col>
            </Row>
            {isLoading && !Error && <h4><Spinner animation="border" variant="primary" /></h4>}
            {!Error && isLoading && <h4>{Error}</h4>}
            <Row>
                Heeyyy
            </Row>
        </Container>
    )
}
