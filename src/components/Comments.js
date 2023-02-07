import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { Alert, Image } from 'react-bootstrap';
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
            {comment?.map((comm, index) => (
                <Alert variant="primary" className="mt-2" style={comm.total === 0 ? { display: 'none' } : { display: 'block' }}>
                    <div key={index} >
                        <Image src={comm.owner.picture} roundedCircle style={{ width: '10%' }} />
                        <p className="d-inline"> {comm.owner.title} {comm.owner.firstName} {comm.owner.lastName}</p><br/>
                        <span><TfiAlarmClock />{getFormattedDate(comm.publishDate)}</span>
                        <p className="mb-0">{comm.message}</p>
                    </div>
                </Alert>
            ))}
        </>

    )
}