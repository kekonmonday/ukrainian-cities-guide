import { LoadingOutlined } from '@ant-design/icons';
import { QueryClient, QueryClientProvider as QueryProvider } from '@tanstack/react-query';
import { Spin } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app/App';
import './index.css';

Spin.setDefaultIndicator(<LoadingOutlined />);

const root = ReactDOM.createRoot(document.getElementById('root')!);

const client = new QueryClient({
  defaultOptions: {
    queries: { retry: false, refetchOnWindowFocus: false },
  },
});

root.render(
  <QueryProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </QueryProvider>
);
