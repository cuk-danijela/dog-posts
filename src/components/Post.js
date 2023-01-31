import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Card, Image, Badge } from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import { BsArrowLeft } from "react-icons/bs";
import { TfiAlarmClock } from 'react-icons/tfi';
import { AiOutlineLike } from "react-icons/ai";
import {someData} from "../data"



export default function Post() {

    const navigate = useNavigate()

    const getFormattedDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleString();
    }

    console.log(someData)

    return (
        <Container>
            <Row className='d-flex justify-content-start'>
                <Col className="col-2">
                    <Button variant="primary" className="btn-block w-100 mt-5 mb-5" onClick={() => navigate("/")}>Go back <BsArrowLeft /></Button>
                </Col>
            </Row>

            <Row>
                {
                    someData && someData.map (data => {
                        return(
                            <p key={data.id}>{data}</p>
                        )
                    }

                    )
                }
                
            </Row>
        </Container>
    )

}