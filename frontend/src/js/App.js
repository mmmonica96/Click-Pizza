import React from 'react';
import '../css/App.css';
import Navbar from './components/Navbar';
import Banner from './components/Banner';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Banner />
        <Navbar />
        <img src="/img/logo.png" className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
