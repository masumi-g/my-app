import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { API_BASE_URL } from '../../api/apiConfig';

function ArticleDetail() {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${API_BASE_URL}/articles/${articleId}`)
      .then((response) => {
        if (response.status === 404) {
          throw new Error('記事が見つかりませんでした。');
        }
        if (!response.ok) {
          throw new Error('記事の読み込みに失敗しました。');
        }
        return response.json();
      })
      .then((data) => {
        setArticle(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [articleId]);

  if (loading) {
    return <p>記事を読み込み中です...</p>;
  }

  if (error) {
    return (
      <main>
        <p>{error}</p>
        <Link to="/articles">記事一覧に戻る</Link>
      </main>
    );
  }

  return (
    <main>
      <article>
        <h1>{article.title}</h1>
        <p>投稿者：{article.author}</p>
        <p>投稿日：{new Date(article.createdAt).toLocaleDateString('ja-JP')}</p>
        <p>{article.content}</p>
      </article>
      <Link to={`/articles/${article.id}/edit`}>この記事を編集</Link>
      <Link to="/articles">記事一覧に戻る</Link>
    </main>
  );
}

export default ArticleDetail;