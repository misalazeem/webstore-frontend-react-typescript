import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
const App = lazy(() => import('./App.tsx'));
import './index.css';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import LoadingComponent from './components/LoadingComponent.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<LoadingComponent />}>
          <App />
        </Suspense>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
