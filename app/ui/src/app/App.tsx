import { FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { CityDetailsPage, CityListPage } from './pages';

export const App: FC = () => (
  <div id='content-container'>
    <div id='content'>
      <BrowserRouter>
        <Routes>
          <Route path='/cities'>
            <Route path='' element={<CityListPage />} />
            <Route path=':id' element={<CityDetailsPage />} />
          </Route>
          <Route path='*' element={<Navigate replace to='/cities' />} />
        </Routes>
      </BrowserRouter>
    </div>
  </div>
);
