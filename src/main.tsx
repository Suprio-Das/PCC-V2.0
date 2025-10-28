import { ThemeProvider } from '@/components/theme-provider.tsx';
import { Analytics } from '@vercel/analytics/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { persistor, store } from '@/Redux/Store.js';
import { PersistGate } from 'redux-persist/integration/react';
import AppRouter from './routes/app.route';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppRouter />
        </PersistGate>
      </Provider>
      <Analytics />
    </ThemeProvider>
  </React.StrictMode>,
);
