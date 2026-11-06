
import styles from "./ArticleDetails.module.css";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import Header from "../../Component/header/header";
import Footer from "../../Component/footer/footer";
import Loader from "../../Component/Loader/Loader";
function ArticleDetails() {

  // دریافت شناسه مقاله از آدرس صفحه
  // مثال: /article/123  =>  id = 123
  const { id } = useParams();

  // اطلاعات مقاله‌ای که از API دریافت می‌کنیم
  const [post, setPost] = useState(null);

  // مشخص می‌کند که اطلاعات هنوز در حال دریافت است یا نه
  const [loading, setLoading] = useState(true);

  // مشخص می‌کند که در دریافت اطلاعات خطایی رخ داده یا نه
  const [error, setError] = useState(false);


  // هر بار که id تغییر کند، این Effect دوباره اجرا می‌شود
  useEffect(() => {

    // اگر شناسه مقاله وجود نداشت، دریافت اطلاعات را متوقف کن
    if (!id) {
      setPost(null);
      setLoading(false);
      setError(true);
      return;
    }

    // ساخت کنترل‌کننده برای لغو درخواست API
    const controller = new AbortController();

    // مشخص می‌کند که این Effect هنوز فعال است یا نه
    let isActive = true;

    // قبل از دریافت مقاله جدید، اطلاعات قبلی را پاک می‌کنیم
    setPost(null);
    setLoading(true);
    setError(false);


    // ارسال درخواست GET به API سایت DEV.to
    // شناسه مقاله را به انتهای آدرس API اضافه می‌کنیم
    axios
      .get(`https://dev.to/api/articles/${id}`, {

        // اتصال AbortController به درخواست Axios
        // تا بتوانیم در صورت نیاز درخواست را لغو کنیم
        signal: controller.signal,
      })

      // اگر درخواست موفق باشد، این قسمت اجرا می‌شود
      .then((res) => {

        // فقط زمانی اطلاعات را ذخیره کن که Effect هنوز فعال باشد
        if (isActive) {
          setPost(res.data);
        }
      })

      // اگر درخواست با خطا مواجه شود، این قسمت اجرا می‌شود
      .catch((err) => {

        // اگر Effect غیرفعال شده یا درخواست لغو شده باشد،
        // ادامه پردازش خطا لازم نیست
        if (!isActive || axios.isCancel(err)) return;

        // نمایش خطا در کنسول مرورگر
        console.error("Error fetching article:", err);

        // فعال کردن وضعیت خطا
        setError(true);
      })

      // این قسمت چه درخواست موفق باشد و چه ناموفق،
      // در پایان اجرای درخواست اجرا می‌شود
      .finally(() => {

        // فقط اگر Effect هنوز فعال باشد، Loading را متوقف کن
        if (isActive) {
          setLoading(false);
        }
      });


    // تابع Cleanup:
    // هنگام تغییر id یا خارج شدن از صفحه اجرا می‌شود
    return () => {

      // اعلام می‌کنیم که Effect قبلی دیگر فعال نیست
      isActive = false;

      // لغو درخواست API قبلی
      controller.abort();
    };

  }, [id]); // وابستگی به id؛ با تغییر آن Effect دوباره اجرا می‌شود


  // پاک‌سازی HTML مقاله برای جلوگیری از اجرای کدهای مخرب
  // اگر post وجود نداشته باشد، یک رشته خالی برمی‌گردانیم
  const safeArticleHtml = post
    ? DOMPurify.sanitize(post.body_html || "")
    : "";


  return (
    <div className={styles.page}>

      {/* نمایش هدر سایت */}
      <Header />

      <main className={styles.main}>

        {/* اگر اطلاعات هنوز دریافت نشده، پیام Loading نمایش بده */}
       {loading && <Loader />}


        {/* اگر Loading تمام شده و مقاله وجود ندارد یا خطایی رخ داده */}
        {!loading && (error || !post) && (
          <p className={styles.error} role="alert">
            Article not found!
          </p>
        )}


        {/* فقط زمانی محتوای مقاله را نمایش بده که:
            ۱. در حال Loading نباشیم
            ۲. خطایی رخ نداده باشد
            ۳. اطلاعات مقاله موجود باشد */}
        {!loading && !error && post && (
          <>

            {/* لینک بازگشت به صفحه اصلی */}
            <Link to="/" className={styles.backButton}>
              <span aria-hidden="true">←</span> Back to Home
            </Link>

            <div className={styles.article}>

              {/* اگر مقاله تصویر اصلی داشت، آن را نمایش بده */}
              {post.cover_image && (
                <img
                  className={styles.cover}
                  src={post.cover_image}
                  alt={post.title}
                  loading="lazy"
                />
              )}


              {/* عنوان مقاله */}
              <h1 className={styles.title}>{post.title}</h1>


              {/* اگر توضیحات مقاله وجود داشت، نمایش بده */}
              {post.description && (
                <p className={styles.description}>{post.description}</p>
              )}


              {/* اطلاعات نویسنده مقاله */}
              <div className={styles.author}>

                {/* تصویر پروفایل نویسنده */}
                {post.user?.profile_image && (
                  <img
                    src={post.user.profile_image}
                    alt={post.user.name || "Author"}
                    loading="lazy"
                  />
                )}

                <div>

                  {/* نام نویسنده؛ اگر موجود نبود Unknown author نمایش بده */}
                  <h3>{post.user?.name || "Unknown author"}</h3>

                  {/* نام کاربری نویسنده */}
                  {post.user?.username && <p>@{post.user.username}</p>}


                  {/* لینک شبکه‌های اجتماعی نویسنده */}
                  <div className={styles.socialLinks}>

                    {/* اگر GitHub نویسنده وجود داشت، لینک آن را بساز */}
                    {post.user?.github_username && (
                      <a
                        href={`https://github.com/${post.user.github_username}`}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        GitHub
                      </a>
                    )}

                    {/* اگر وب‌سایت نویسنده وجود داشت، لینک آن را نمایش بده */}
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


              {/* زمان تقریبی مطالعه مقاله بر حسب دقیقه */}
              {post.reading_time_minutes != null && (
                <p className={styles.readingTime}>
                  {post.reading_time_minutes} min read
                </p>
              )}


              {/* بررسی می‌کنیم tag_list آرایه باشد و حداقل یک تگ داشته باشد */}
              {Array.isArray(post.tag_list) && post.tag_list.length > 0 && (
                <div className={styles.tags}>

                  {/* با map تمام تگ‌های مقاله را نمایش می‌دهیم */}
                  {post.tag_list.map((tag) => (
                    <span key={tag}>#{tag}</span>
                  ))}
                </div>
              )}


              {/* نمایش محتوای کامل مقاله */}
              {/* dangerouslySetInnerHTML اجازه می‌دهد HTML دریافتی از API
                  به‌عنوان محتوای واقعی HTML نمایش داده شود */}
              {/* محتوای HTML قبل از نمایش با DOMPurify پاک‌سازی شده است */}
              <article
                key={post.id}
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: safeArticleHtml }}
              />

            </div>
          </>
        )}
      </main>

      {/* نمایش فوتر سایت */}
      <Footer />
    </div>
  );
}

export default ArticleDetails;
