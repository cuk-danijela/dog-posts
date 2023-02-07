import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Spinner, Card, ListGroup, Image, Badge } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom"
import { BsArrowLeft } from "react-icons/bs";
import { TfiAlarmClock } from 'react-icons/tfi';
import { AiOutlineLike, AiOutlineInstagram } from "react-icons/ai";
import { apiUrl, apiKey } from '../util/api';
import Comments from "./Comments";

export default function Post() {

    const navigate = useNavigate()

    const [post, setPost] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const { postId } = useParams();

    const getFormattedDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleString();
    }

    useEffect(() => {
        const getCountryByName = async () => {
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
                console.log(data);
            } catch (error) {
                setIsLoading(false);
                setError(error.message);
            }
        };

        getCountryByName();
    }, [postId]);


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
                <Col>
                    <Card className="flex-row">
                        <div className="cardDiv">
                            <Image variant="top" src={post.image} style={{ width: "100%" }} />
                        </div>
                        <div className="cardDiv">
                            {/* <div>
                                <Image src={post.owner.picture} roundedCircle style={{ width: '20%' }} />
                                <p>{post.owner.title} {post.owner.firstName} {post.owner.lastName}</p>
                            </div> */}

                            <TfiAlarmClock />{getFormattedDate(post.publishDate)}
                            <hr />
                            <AiOutlineLike /> {post.likes}  <Card.Link href={post.link} style={post.link == null ? { display: 'none' } : { display: 'inline' }} ><AiOutlineInstagram /> Instagram</Card.Link>
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
