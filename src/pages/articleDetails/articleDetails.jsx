import styles from "./ArticleDetails.module.css";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import Header from "../../Component/header/header";
import Footer from "../../Component/footer/footer";

function ArticleDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) {
      setPost(null);
      setLoading(false);
      setError(true);
      return;
    }

    const controller = new AbortController();
    let isActive = true;

    setPost(null);
    setLoading(true);
    setError(false);

    axios
      .get(`https://dev.to/api/articles/${id}`, {
        signal: controller.signal,
      })
      .then((res) => {
        if (isActive) {
          setPost(res.data);
        }
      })
      .catch((err) => {
        if (!isActive || axios.isCancel(err)) return;

        console.error("Error fetching article:", err);
        setError(true);
      })
      .finally(() => {
        if (isActive) {
          setLoading(false);
        }
      });

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [id]);

  const safeArticleHtml = post
    ? DOMPurify.sanitize(post.body_html || "")
    : "";

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        {loading && (
          <p className={styles.loading} role="status" aria-live="polite">
            Loading article...
          </p>
        )}

        {!loading && (error || !post) && (
          <p className={styles.error} role="alert">
            Article not found!
          </p>
        )}

        {!loading && !error && post && (
          <>
            <Link to="/" className={styles.backButton}>
              <span aria-hidden="true">←</span> Back to Home
            </Link>

            <div className={styles.article}>
              {post.cover_image && (
                <img
                  className={styles.cover}
                  src={post.cover_image}
                  alt={post.title}
                  loading="lazy"
                />
              )}

              <h1 className={styles.title}>{post.title}</h1>

              {post.description && (
                <p className={styles.description}>{post.description}</p>
              )}

              <div className={styles.author}>
                {post.user?.profile_image && (
                  <img
                    src={post.user.profile_image}
                    alt={post.user.name || "Author"}
                    loading="lazy"
                  />
                )}

                <div>
                  <h3>{post.user?.name || "Unknown author"}</h3>

                  {post.user?.username && <p>@{post.user.username}</p>}

                  <div className={styles.socialLinks}>
                    {post.user?.github_username && (
                      <a
                        href={`https://github.com/${post.user.github_username}`}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        GitHub
                      </a>
                    )}

                    {post.user?.website_url && (
                      <a
                        href={post.user.website_url}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        Website
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {post.reading_time_minutes != null && (
                <p className={styles.readingTime}>
                  {post.reading_time_minutes} min read
                </p>
              )}

              {Array.isArray(post.tag_list) && post.tag_list.length > 0 && (
                <div className={styles.tags}>
                  {post.tag_list.map((tag) => (
                    <span key={tag}>#{tag}</span>
                  ))}
                </div>
              )}

              <article
                key={post.id}
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: safeArticleHtml }}
              />
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default ArticleDetails;
