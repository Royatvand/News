import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function ArticleDetails() {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        axios.get(`https://dev.to/api/articles/${id}`)
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
            {post.cover_image && (
                <img
                    src={post.cover_image}
                    alt={post.title}
                    style={{ maxWidth: "100%" }}
                />
            )}

            <h1>{post.title}</h1>
            <p>{post.description}</p>

            <p>
                {post.user?.name || post.user?.username} · {post.reading_time_minutes} min read
            </p>

            <div>
                {post.tag_list?.map(tag => (
                    <span key={tag}> #{tag} </span>
                ))}
            </div>

            <article dangerouslySetInnerHTML={{ __html: post.body_html || "" }} />
        </div>
    );
}

export default ArticleDetails;
