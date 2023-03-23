import React from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,

} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.scss';
import './js/components/card.scss';
import App from './js/app';
import AListApp from './js/AList/app';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="ALVAN-V4" element={<App />} />
        <Route path="todoList" element={<AListApp />} />
        <Route path="todoList/:token" element={<AListApp />} />
        <Route path="ALVAN-V4/todoList/djk" element={<AListApp />} />
        <Route path="ALVAN-V4/ALVAN-V4" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
