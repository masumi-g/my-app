import { useEffect, useState } from 'react';

export function useArticle(articleId) {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(Boolean(articleId));
  const [error, setError] = useState('');

  useEffect(() => {
    if (!articleId) {
      setArticle(null);
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    setLoading(true);
    setError('');

    fetch(`http://localhost:3000/articles/${articleId}`, {
      cache: 'no-store',
      signal: controller.signal,
    })
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
        if (error.name !== 'AbortError') {
          setError(error.message);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, [articleId]);

  return { article, loading, error };
}