import { API_BASE_URL } from '../api/apiConfig';
import { useEffect, useState } from 'react';

export function useArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

   fetch(`${API_BASE_URL}/articles`, {
      cache: 'no-store',
      signal: controller.signal,
    })
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
  }, []);

  return { articles, loading, error };
}