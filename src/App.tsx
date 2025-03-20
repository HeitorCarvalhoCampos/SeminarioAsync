import React, { useEffect, useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar'; 
import Information from './components/Information/Information';

interface Informacao {
  cidade: string;
  temperatura: string;
  descricao: string;
  diaSemana: string;
  umidade: string;
  chuva: string;
  vento: string;
  icon: string;
}




function App() {
  const apiKey = "d8235fe0545e4dd8adf7186f2c647f73";
  const [informacoes, setInformacoes] = useState<Informacao[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const today = new Date();

  function handleSearch(query: string) {
    console.log("Recebido no componente pai:", query);
    setSearchQuery(query);
    // Aqui você pode chamar uma API ou atualizar a interface
  }


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

      fetch(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${apiKey}`)
        .then(response => response.json())
        .then(weather => {
          console.log(weather);
          const novaInformacao: Informacao = {
            cidade: weather.data[0].city_name,
            temperatura: weather.data[0].temp.toString(),
            descricao: weather.data[0].weather.description,
            diaSemana: today.toLocaleDateString('pt-BR', { weekday: 'long' }).charAt(0).toUpperCase() + today.toLocaleDateString('pt-BR', { weekday: 'long' }).slice(1),
            umidade: weather.data[0].rh.toString(),
            chuva: weather.data[0].precip.toString(),
            vento: weather.data[0].wind_spd.toString(),
            icon: weather.data[0].weather.icon,
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
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="divInformations">
        <Information informacoes={informacoes} />
      </div>
    </div>
  );
}

export default App;
