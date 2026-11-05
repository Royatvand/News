import React from 'react';
import styles from './ArticleCard.module.css';

function ArticleCard(props) {
    return (
        <div className={styles.card}>

            <h2 className={styles.title}>
                {props.article.title}
            </h2>

            <p className={styles.summary}>
                {props.article.body}
            </p>

            
                <div className={styles.meta}>  
            <p>شناسه مقاله: {props.article.id}</p>

            <p>بازدید: {props.article.views}</p>

            <p>لایک: {props.article.reactions.likes}</p>

            <p>دیسلایک: {props.article.reactions.dislikes}</p>
             </div>
            
            

         
        </div>
    );
}

export default ArticleCard;