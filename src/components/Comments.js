import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { apiUrl, apiKey } from '../util/api';



export default function Comments() {

    const [comment, setComment] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const { postId } = useParams();

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
                setComment(data);
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
        <div>

            
        </div>

    )
}