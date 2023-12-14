import React from 'react';
import './LoadingScreen.css'; // Importez le fichier CSS
import logo from '../assets/logo_Gabor45_notxt.svg'; // Ajustez le chemin d'accès en conséquence

const LoadingScreen = () => {
  return (
      <div className="loading-container">
          <img src={logo} alt="Loading..." className="loading-logo" />
      </div>
  );
};

export default LoadingScreen;
