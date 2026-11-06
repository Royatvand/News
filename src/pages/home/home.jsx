import React from 'react'
import ArticleCard from '../../Component/ArticleCard/ArticleCard'
import Header from '../../Component/header/header'
import Footer from '../../Component/footer/footer'
import styles from './home.module.css'
import axios from 'axios';
import { useEffect, useState } from 'react';

function Home() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        axios.get('https://dev.to/api/articles?per_page=30')
            .then(response => {
                setArticles(response.data);
            })
            .catch(error => {
                console.log('Error fetching articles:', error);
            });
    }, []);

    return (
        <>
            <Header />

            <div className={styles.container}>
                {articles.map(article => (
                    <ArticleCard article={article} key={article.id} />
                ))}
            </div>

            <Footer />
        </>
    )
}

export default Home;
