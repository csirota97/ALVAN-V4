import React from 'react';
import { 
  BrowserRouter,
  Routes,
  Route,
  
} from "react-router-dom";
import ReactDOM from 'react-dom';
import './index.scss';
import './js/components/card.scss';
import App from './js/app';
import {default as AListApp} from './js/AList/app';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="ALVAN-V4" element={<AListApp />} />
        <Route path="ALVAN-V4/ALVAN-V4" element={<AListApp />} />
        <Route path="ALVAN-V4/expenses" element={<AListApp />} />
        <Route path="expenses" element={<AListApp />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
