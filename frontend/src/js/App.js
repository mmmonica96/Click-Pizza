import React from 'react';
import '../css/App.css';
import Navbar from './components/Navbar';
import Banner from './components/Banner';


function App() {
  return (
    <div className="App">
      <header className="App-header">
       <div className="logo-banner-container">
          <img src="/img/logo.png" className="App-logo" alt="logo" />
          <Banner />
        </div>
        <Navbar />
      </header>
      <main className="App-main" >        
  <img src="/img/Ofertas.png" className="Banner-ofertas" alt="ofertas" />
</main>

    </div>
  );
}

export default App;
