import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ArticleForm() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const article = {
      title: formData.get('title'),
      author: formData.get('author'),
      content: formData.get('content'),
      createdAt: new Date().toISOString(),
    };

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3000/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(article),
      });

      if (!response.ok) {
        throw new Error('記事を投稿できませんでした。');
      }

      navigate('/articles');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main>
      <h1>記事を投稿</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">タイトル</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="例：React Hooksの基本"
            required
          />
        </div>

        <div>
          <label htmlFor="author">投稿者名</label>
          <input
            id="author"
            name="author"
            type="text"
            placeholder="例：Tech Taro"
            required
          />
        </div>

        <div>
          <label htmlFor="content">本文</label>
          <textarea
            id="content"
            name="content"
            rows="8"
            placeholder="記事の内容を入力してください"
            required
          />
        </div>

        {error && <p>{error}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '投稿中...' : '記事を投稿する'}
        </button>
      </form>
    </main>
  );
}

export default ArticleForm;