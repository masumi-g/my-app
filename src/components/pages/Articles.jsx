import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useArticles } from '../../hooks/useArticles';

function Articles() {
  const { articles, loading, error } = useArticles();
  const [searchTerm, setSearchTerm] = useState('');

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();

  const filteredArticles = articles.filter((article) => {
  const searchableText = `${article.title} ${article.content}`.toLowerCase();
  return searchableText.includes(normalizedSearchTerm);
  });


  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-8 text-left">
      <h1>記事一覧</h1>

      <p>技術ナレッジを共有しましょう。</p>

      <Link
        to="/articles/new"
        className="inline-block rounded-lg bg-blue-600 px-4 py-2 font-medium text-white no-underline hover:bg-blue-700"
      >
        新しい記事を投稿
      </Link>

      <div className="my-6">
        <label
          htmlFor="article-search"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          記事を検索
        </label>

        <input
          id="article-search"
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="タイトル・本文で検索"
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => setSearchTerm('')}
            className="mt-2 rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100"
          >
            検索をクリア
          </button>
        )}
      </div>

      {loading && <p className="mt-6 rounded-lg bg-slate-50 p-4 text-slate-600">
          記事を読み込み中です...
        </p>
      }

      {error && <p className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700" role="alert">
          {error}
        </p>
      }

      {!loading && !error && articles.length === 0 && (
        <p className="mt-6 rounded-lg bg-slate-50 p-4 text-slate-600">
          記事はまだありません。
        </p>
      )}

      {!loading && !error && articles.length > 0 && filteredArticles.length === 0 && (
      <p className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-800">
        検索に一致する記事はありません。
      </p>
      )}


      {!loading && !error && filteredArticles.length > 0 && (
        <ul className="mt-6 list-none space-y-4 p-0">
          {filteredArticles.map((article) => (
            <li key={article.id}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h2 className="mb-2 text-xl font-semibold">
                <Link className="text-slate-900 no-underline hover:text-blue-700 
                hover:underline"
                to={`/articles/${article.id}`}>
                  {article.title}
                </Link>
              </h2>
              <p className="mb-2 text-sm text-slate-500">投稿者：{article.author}</p>
              <p>
                {article.content.length > 100
                ? `${article.content.slice(0, 100)}…`
                : article.content}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default Articles;