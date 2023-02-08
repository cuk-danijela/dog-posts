import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { Alert, Image, Form, FloatingLabel, Button, Accordion } from 'react-bootstrap';
import { TfiAlarmClock } from 'react-icons/tfi';
import { apiUrl, apiKey } from '../util/api';



export default function Comments() {

    const [comment, setComment] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const { postId } = useParams();

    const getFormattedDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleString();
    }

    useEffect(() => {
        const getComments = async () => {
            try {
                const res = await fetch(`${apiUrl}/post/${postId}/comment`, {
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
                setComment(data.data);
                setIsLoading(false);
                console.log(data);
            } catch (error) {
                setIsLoading(false);
                setError(error.message);
            }
        };

        getComments();
    }, [postId]);


    return (
        <>
            <Alert variant="primary" className="mt-2" >
                <Form>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="User name"
                        className="mb-3"
                    >
                        <Form.Control type="text" placeholder="Your name" />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingTextarea2" label="Comments">
                        <Form.Control
                            as="textarea"
                            placeholder="Leave a comment here"
                            style={{ height: '100px' }}
                        />
                    </FloatingLabel>

                    <Button variant="primary" type="submit" className="card-btn">
                        Send your comment 
                    </Button>
                </Form>

                <Accordion defaultActiveKey="0" flush className="mt-4" style={comment.total === 0 ? { display: 'none' } : { display: 'block' }}>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header> Join the Discussion!</Accordion.Header>
                        <Accordion.Body>
                            {comment?.map((comm, index) => (
                                <>
                                    <div key={index}>
                                        <Image src={comm.owner.picture} roundedCircle style={{ width: '10%' }} />
                                        <p className="d-inline"> {comm.owner.title} {comm.owner.firstName} {comm.owner.lastName}</p><br />
                                        <span><TfiAlarmClock />{getFormattedDate(comm.publishDate)}</span>
                                        <p className="mb-0">{comm.message}</p>
                                        <hr/>
                                    </div>
                                </>
                            ))}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            
            
            </Alert>
        </>

    )
}