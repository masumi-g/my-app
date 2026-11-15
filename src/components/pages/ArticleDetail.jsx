import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useArticle } from '../../hooks/useArticle';

function ArticleDetail() {
  const { articleId } = useParams();
  const { article, loading, error } = useArticle(articleId);

  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  async function handleDelete() {
    if (!window.confirm('この記事を削除しますか？')) {
      return;
    }

    setIsDeleting(true);
    setDeleteError('');

    try {
      const response = await fetch(
        `http://localhost:3000/articles/${articleId}`,
        { method: 'DELETE' },
      );

      if (!response.ok) {
        throw new Error('記事を削除できませんでした。');
      }

      navigate('/articles');
    } catch (error) {
      setDeleteError(error.message);
    } finally {
      setIsDeleting(false);
    }
  }

  
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
    <main className="mx-auto w-full max-w-3xl px-6 py-8 text-left">
      <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="m-0 mb-4 text-3xl font-bold text-slate-900">
          {article.title}
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          投稿者：{article.author}
        </p>

        <p className="mt-1 text-sm text-slate-500">
          投稿日：
          {new Date(article.createdAt).toLocaleDateString('ja-JP')}
        </p>

        <p className="mt-6 whitespace-pre-wrap leading-7 text-slate-700">
          {article.content}
        </p>
      </article>

      {deleteError && (
        <p className="mt-4 text-sm text-red-700" role="alert">
          {deleteError}
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Link
          to={`/articles/${article.id}/edit`}
          className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white no-underline hover:bg-blue-700"
        >
          この記事を編集
        </Link>

        <button
          type="button"
          onClick={handleDelete}
          disabled={isDeleting}
          className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700 disabled:opacity-50"
        >
          {isDeleting ? '削除中...' : 'この記事を削除'}
        </button>
      </div>

      <p className="mt-5">
        <Link
          to="/articles"
          className="text-blue-700 underline hover:text-blue-900"
        >
          記事一覧に戻る
        </Link>
      </p>
    </main>
  );
}

export default ArticleDetail;