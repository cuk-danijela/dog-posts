import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Card, Image, Badge } from 'react-bootstrap';
import { useNavigate, useParams, Link } from "react-router-dom"
import { BsArrowLeft } from "react-icons/bs";
import { apiUrl, apiKey } from '../util/api';



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

    useEffect(() => {
        const getPostById = async () => {
            try {
                const res = await fetch(`${apiUrl}/post/${postId}`, {
                    method: "GET",
                    withCredentials: true,
                    headers: {
                        'app-id': apiKey,
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data'
                    },
                });
                if (!res.ok) throw new Error("Could not found!");
                const data = await res.json();
                setPost(data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                setError(error.message);
            }
        };

        getPostById();
    }, [postId]);

    return (
        <Container>
            <Row className='d-flex justify-content-start'>
                <Col className="col-2">
                    <Button variant="primary" className="btn-block w-100 mt-5 mb-5" onClick={() => navigate("/")}>Go back <BsArrowLeft /></Button>
                </Col>
            </Row>
            {isLoading && !error && <h4>Loading........</h4>}
            {error && !isLoading && { error }}
            <Row>
                {post?.map((post, index) => (<p key={index}>{post}</p>))}
            </Row>
        </Container>
    )
}
 