import { ThemeProvider } from '@/components/theme-provider.tsx';
import { Analytics } from '@vercel/analytics/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { AuthProvider } from './providers/authProvider/authProvider.tsx';
import appRouter from './routes/app.route.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={appRouter} />
      </AuthProvider>
      <Analytics />
    </ThemeProvider>
  </React.StrictMode>,
);
