import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Spinner, Card, ListGroup, Image, Badge } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom"
import { BsArrowLeft } from "react-icons/bs";
import { TfiAlarmClock } from 'react-icons/tfi';
import { AiOutlineLike, AiOutlineInstagram, AiFillEdit, AiFillDelete } from "react-icons/ai";
import { apiUrl, apiKey } from '../util/api';
import Comments from "./Comments";

export default function Post() {

    const navigate = useNavigate()
    const [post, setPost] = useState([]);
    const { postId } = useParams();

    const getFormattedDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleString();
    }

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
                console.log(data);
            } catch (error) {
                console.log(error.message);
            }
        };

        getPostById();
    }, [postId]);


    return (

        <Container>
            <Row className='d-flex justify-content-start'>
                <Col className="col-2">
                    <Button variant="primary" className="btn-block w-100 mt-5 mb-5" onClick={() => navigate("/")}><BsArrowLeft /> Go back </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card className="flex-row mb-5">
                        <div className="cardDiv">
                            <Image variant="top" src={post.image} style={{ width: "100%" }} className="mb-2" />
                            <Button variant="primary" style={{margin: "20px"}} onClick={() => navigate(`/post/${post.id}`)}>Edit post <AiFillEdit /></Button>
                            <Button variant="primary" style={{margin: "20px"}} onClick={() => navigate(`/post/${post.id}`)}>Delete post <AiFillDelete /></Button>
                        </div>
                        <div className="cardDiv d-inline">
                            <div style={{ textAlign: 'left' }}>
                                {/* <Image src={post.owner.picture} roundedCircle style={{ width: '10%', marginRight: '10px' }} /> */}
                                <p className="d-inline position-absolute text-left">
                                    {/* <AiOutlineUser /> {post.owner.title} {post.owner.firstName} {post.owner.lastName}<br /> */}
                                    <TfiAlarmClock /> {getFormattedDate(post.publishDate)}
                                </p>
                            </div>
                            <div className="d-flex justify-content-end ">
                                <h5 style={{ textAlign: "left" }}><AiOutlineLike /> {post.likes}  <br />
                                    <Card.Link href={post.link} style={post.link == null ? { display: 'none' } : { display: 'inline' }} ><AiOutlineInstagram /> Instagram</Card.Link></h5>
                            </div>
                            <hr />
                            <p>{post.text}</p>
                            <hr />
                            <div className="mb-5">{post.tags?.map((tag, index) => (<span key={index} className="card-tags">{tag}</span>))}</div>
                            <Comments />
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
