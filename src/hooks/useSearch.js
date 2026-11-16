import { useMemo } from 'react';

export function useSearch(articles, searchTerm) {
  return useMemo(() => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    return articles.filter((article) => {
      const searchableText =
        `${article.title} ${article.content}`.toLowerCase();

      return searchableText.includes(normalizedSearchTerm);
    });
  }, [articles, searchTerm]);
}