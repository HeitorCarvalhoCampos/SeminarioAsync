import React, { useEffect, useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar'; 
import Information from './components/Information/Information';

interface Informacao {
  temperatura: string;
  condicao: string;
  bairro: string;
}



function App() {
  const apiKey = "1663760659498a69525148f4061c7d65";
  const [informacoes, setInformacoes] = useState<Informacao[]>([]);

  useEffect(() => {
    if (informacoes.length === 0) { 
      obterLocalizacao();
    }
  }, [informacoes]); 

function obterLocalizacao() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt`)
        .then(response => response.json())
        .then(weather => {
          console.log(weather);
          const novaInformacao: Informacao = {
            temperatura: weather.main.temp + "°C",
            condicao: weather.weather[0].description,
            bairro: weather.name,
          };
          setInformacoes(prevInformacoes => [novaInformacao]);
        })
        .catch(error => console.error("Erro ao obter clima:", error));
    }, (error) => {
      console.error("Erro ao obter localização", error);
    });
  } else {
    console.log("Geolocalização não disponível no navegador.");
  }
}

  return (
    <div className="App">
      <div className="divLogo">
        <img className='logo' src={process.env.PUBLIC_URL + "/logo-climorld.png"} alt="Mundo Clima" />
        <SearchBar/>
      </div>
      <div className="divInformations">
        <Information informacoes={informacoes} />
      </div>
    </div>
  );
}

export default App;
