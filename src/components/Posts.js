import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"
import { Card, Container, Row, Col, Button, Badge, Spinner, Image } from 'react-bootstrap';
import { apiUrl, apiKey } from '../util/api';
import { TfiAlarmClock } from 'react-icons/tfi';
import { BsArrowRight, BsEmojiSmile } from "react-icons/bs";
import { AiOutlineLike, AiOutlinePlus } from "react-icons/ai";


export default function Posts() {

    const navigate = useNavigate()
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [Error, setError] = useState('');

    const getFormattedDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleString();
    }

    const getAllPosts = async () => {
        try {
            const res = await fetch(`${apiUrl}/post`, {
                method: "GET",
                withCredentials: true,
                headers: {
                    'app-id': apiKey,
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                },
            })
            if (!res.ok) throw new Error("Not right!");
            const data = await res.json();
            setPosts(data.data);
            setIsLoading(false);
            console.log(data);
        }
        catch (error) {
            setIsLoading(false);
            setError(error.message);
            console.log(error.message);
        }
    };

    useEffect(() => {
        getAllPosts();
    }, []);

    return (
        <Container>
            <div className="jumbotron">
                <h1>PAGE FOR DOG LOVERS</h1>
                <h4 className="text-light">... and one cat <BsEmojiSmile /></h4>
            </div>
            {isLoading && !Error && <h4><Spinner animation="border" variant="primary" /></h4>}
            {!Error && isLoading && <h4>{Error}</h4>}
            <Row className='d-flex justify-content-center'>
                <Col className="col-6">
                    <Button variant="primary" className="btn-block w-100 mt-5 mb-5" onClick={() => navigate("/new")}>Create new post <AiOutlinePlus /></Button>
                </Col>
            </Row>
            <Row>
                {posts
                    .sort((a, b) => (a.publishDate > b.publishDate ? 1 : -1))
                    .map((post) => (
                        <Col key={post.id}>
                            <Card className="card-div">
                                <Card.Header className="text-start">
                                    <Image src={post.owner.picture} roundedCircle style={{ width: '20%' }} /> {post.owner.firstName} {post.owner.lastName}
                                </Card.Header>
                                <div className="card-img" style={{ backgroundImage: `url(${(post.image)})` }}><h3 className="card-badge">
                                    <Badge bg="secondary"><AiOutlineLike />{post.likes}</Badge></h3></div>
                                <Card.Body>
                                    <Card.Title>Card Title</Card.Title>
                                    <Card.Text>
                                        <TfiAlarmClock /><span>{getFormattedDate(post.publishDate)}</span><br />
                                        <div className="card-text">{post.text}</div>
                                        {post.tags.map((tag, index) => (<div key={index} className="card-tags">{tag}</div>))}
                                    </Card.Text>
                                    <Link to={`/post/${post.id}`}>
                                        <Button variant="primary" className="card-btn">View more details <BsArrowRight /></Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                <p className="text-center text-light text-xs mt-6">
                    &copy;2023 Cuk Danijela | All rights reserved.
                </p>
            </Row>
        </Container>
    )
}