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
        axios.get('https://dummyjson.com/posts')
            .then(response => {
                setArticles(response.data.posts);
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