import React from 'react';
import './css/reset.css';
import './css/app.css';
import Main from './components/Main/Main';
import { GlobalProvider } from './context/GlobalState';

const App = () => {
  return (
    <div className="app">
      <GlobalProvider>
        <Main />
      </GlobalProvider>
    </div>
  );
}

export default App;