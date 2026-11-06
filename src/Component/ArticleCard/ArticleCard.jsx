import React from 'react';
import styles from './ArticleCard.module.css';
import { Link } from 'react-router-dom';
import { FaClock, FaThumbsUp, FaComment, FaHashtag, FaUser } from 'react-icons/fa';

function ArticleCard(props) {
    const article = props.article;

    return (
        <div className={styles.card}>
            <div className={styles.Container}>
                <h2 className={styles.title}>
                    {article.title}
                </h2>

                <p className={styles.summary}>
                    {article.description || 'No description available.'}
                </p>

                <div className={styles.meta}>
                    <p>
                        {article.user?.name || article.user?.username || 'Unknown author'} <FaUser />
                    </p>

                    <p>
                        {article.reading_time_minutes} min <FaClock />
                    </p>

                    <p>
                        {article.public_reactions_count} <FaThumbsUp />
                    </p>

                    <p>
                        {article.comments_count} <FaComment />
                    </p>

                    {article.tag_list?.slice(0, 2).map(tag => (
                        <p key={tag}>
                            {tag} <FaHashtag />
                        </p>
                    ))}

                    <div className={styles.btn}>
                        <Link to={`/article/${article.id}`}>
                            Read More
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ArticleCard;
