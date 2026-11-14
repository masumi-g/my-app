import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/articles')
      .then((response) => {
        if (!response.ok) {
          throw new Error('記事の読み込みに失敗しました。');
        }
        return response.json();
      })
      .then((data) => {
        setArticles(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main>
      <h1>記事一覧</h1>

      <p>技術ナレッジを共有しましょう。</p>

      <Link to="/articles/new">新しい記事を投稿</Link>

      {loading && <p>記事を読み込み中です...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && articles.length === 0 && (
        <p>記事はまだありません。</p>
      )}

      {!loading && !error && articles.length > 0 && (
        <ul>
          {articles.map((article) => (
            <li key={article.id}>
              <h2>
                <Link to={`/articles/${article.id}`}>
                  {article.title}
                </Link>
              </h2>
              <p>投稿者：{article.author}</p>
              <p>{article.content}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default Articles;