/* Reactアプリの起動担当  　           */
/* createRootでReactを起動            */
/* BrowserRouterでルーティングを有効化 */
/* App.jsxを読み込む　　　　　　　     */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';

// message.jsを読み込む
import { message } from './message.js';

// 確認
console.log(message);

createRoot(document.getElementById('root')).render( //アプリを起動する
  <StrictMode>
    <BrowserRouter> 
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);