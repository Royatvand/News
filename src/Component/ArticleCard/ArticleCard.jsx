import React from 'react';
import styles from './ArticleCard.module.css';
import { FaEye, FaThumbsUp, FaThumbsDown, FaHashtag } from 'react-icons/fa';
function ArticleCard(props) {
    const { title, body, id, views, reactions } = props.article;
    return (
        
        <div className={styles.card}>
            <div className={styles.Container}>
            
            <h2 className={styles.title}>
                {props.article.title}
            </h2>

            <p className={styles.summary}>
                {props.article.body}
            </p>


                <div className={styles.meta}>  
            <p> id: {props.article.id} <FaHashtag /></p>

            <p>view: {props.article.views} <FaHashtag /></p>

            <p>like: {props.article.reactions.likes} <FaThumbsUp /> </p>

            
            <p>dislike: {props.article.reactions.dislikes} <FaThumbsDown /> </p>
            <div className={styles.btn}>
            <a >
                Read More
            </a>
            </div>
             </div>

            </div>
            

         
        </div>
    );
}

export default ArticleCard;