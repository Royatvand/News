
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function ArticleDetails() {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        axios.get(`https://dummyjson.com/posts/${id}`)
            .then((res) => {
                setPost(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    if (!post) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
        </div>
    );
}

export default ArticleDetails;
