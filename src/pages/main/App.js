import React from 'react';
import logo from '../../assets/images/logo.svg';
import './App.css';
import HeaderComp from '../../components/header-component/header-component'
import FooterComp from '../../components/footer-component/footer-component'
import MainRouter from '../../routers';

function App() {
  return (
    <div className="App">
      <HeaderComp></HeaderComp>
      <MainRouter></MainRouter>
      <FooterComp></FooterComp>
    </div>
  );
}

export default App;
