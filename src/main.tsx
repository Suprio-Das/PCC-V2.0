import { ThemeProvider } from '@/components/theme-provider.tsx';
import { Analytics } from '@vercel/analytics/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import appRouter from './routes/app.route.tsx';
import { Provider } from 'react-redux';
import { persistor, store } from '@/Redux/Store.js';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={appRouter} />
        </PersistGate>
      </Provider>
      <Analytics />
    </ThemeProvider>
  </React.StrictMode>,
);
