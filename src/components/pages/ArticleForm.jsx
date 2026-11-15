import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useArticle } from '../../hooks/useArticle';
import { useAuth } from '../../contexts/AuthContext';
import { API_BASE_URL } from '../../api/apiConfig';

function ArticleForm() {
  const { articleId } = useParams();
  const isEditMode = Boolean(articleId);
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    article: existingArticle,
    loading: isLoading,
    error: loadError,
  } = useArticle(articleId);

  const [formData, setFormData] = useState({
    title: '',
    author: user?.name ?? '',
    content: '',
  });
 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');


 useEffect(() => {
  if (existingArticle) {
    setFormData({
      title: existingArticle.title,
      author: existingArticle.author,
      content: existingArticle.content,
    });
  } else if (user && !isEditMode) {
    setFormData((current) => ({
      ...current,
      author: user.name,
    }));
  }
}, [existingArticle, user, isEditMode]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    const article = isEditMode
      ? formData
      : { ...formData, createdAt: new Date().toISOString() };

    try {
      const response = await fetch(
        isEditMode
        ? `${API_BASE_URL}/articles/${articleId}`
        : `${API_BASE_URL}/articles`,
        {
          method: isEditMode ? 'PATCH' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(article),
        },
      );

      if (!response.ok) {
        throw new Error('記事を保存できませんでした。');
      }

      navigate(
        isEditMode ? `/articles/${articleId}` : '/articles',
      );
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

    if (isLoading) {
    return <p>記事を読み込み中です...</p>;
  }

  if (loadError) {
    return (
      <main>
        <p>{loadError}</p>
        <Link to="/articles">記事一覧に戻る</Link>
      </main>
    );
  }

  if (isEditMode && user?.name !== existingArticle?.author) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-8 text-left">
      <h1>{isEditMode ? '記事を編集' : '記事を投稿'}</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700" 
          htmlFor="title">タイトル</label>
          <input
            className="w-full rounded-lg border border-slate-300 bg-white 
            px-3 py-2 text-slate-900 outline-none focus:border-blue-500 
            focus:ring-2 focus:ring-blue-200"
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700"
          htmlFor="author">投稿者名</label>
          <input
            className="w-full rounded-lg border border-slate-300 bg-white 
            px-3 py-2 text-slate-900 outline-none focus:border-blue-500 
            focus:ring-2 focus:ring-blue-200"
            id="author"
            name="author"
            type="text"
            value={formData.author}
            onChange={handleChange}
            required
            readOnly={Boolean(user)}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700"
          htmlFor="content">本文</label>
          <textarea
            className="w-full rounded-lg border border-slate-300 bg-white 
            px-3 py-2 text-slate-900 outline-none focus:border-blue-500 
            focus:ring-2 focus:ring-blue-200"
            id="content"
            name="content"
            rows="8"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>

        {submitError && <p>{submitError}</p>}

        <button 
        className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white 
        hover:bg-blue-700 disabled:opacity-50"
        type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? '保存中...'
            : isEditMode
              ? '変更を保存'
              : '記事を投稿する'}
        </button>
      </form>

      <p className="mt-5">
        <Link
          to={isEditMode ? `/articles/${articleId}` : '/articles'}
          className="text-blue-700 underline hover:text-blue-900"
        >
          キャンセル
        </Link>
      </p>
    </main>
  );
}

export default ArticleForm;