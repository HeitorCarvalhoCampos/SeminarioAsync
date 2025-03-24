import React, { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import Information from "./components/Information/Information";
import WeekBar from "./components/WeekBar/WeekBar";

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

interface WeekInformation {
  data: string;
  high_temp: string;
  low_temp: string;
  max_temp: string;
  min_temp: string;
  condicao: string;
  wind_speed: number;
  humidity: number;
  rain: number;
}

function App() {
  const apiKey = "d8235fe0545e4dd8adf7186f2c647f73";
  const [informacoes, setInformacoes] = useState<Informacao[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [weekInformacoes, setWeekInformacoes] = useState<WeekInformation[]>([]);
  const today = new Date();

  function handleSearch(query: string) {
    console.log("Recebido no componente pai:", query);
    setSearchQuery(query);
    fetch(`https://api.weatherbit.io/v2.0/current?city=${query}&key=${apiKey}`)
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
          icon: weather.data[0].weather.icon
        };
        setInformacoes([novaInformacao]);
      })
      .catch(error => console.error(error));
  }

  useEffect(() => {
    if (informacoes.length === 0) {
      obterLocalizacao();
    }
  }, [informacoes]);

  useEffect(() => {
    if (weekInformacoes.length === 0) {
      obterWeekInformacoes();
    }
  }, [weekInformacoes]);

  function obterLocalizacao() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          fetch(
            `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${apiKey}`
          )
            .then((response) => response.json())
            .then((weather) => {
              console.log(weather);
              const novaInformacao: Informacao = {
                cidade: weather.data[0].city_name,
                temperatura: weather.data[0].temp.toString(),
                descricao: weather.data[0].weather.description,
                diaSemana:
                  today
                    .toLocaleDateString("pt-BR", { weekday: "long" })
                    .charAt(0)
                    .toUpperCase() +
                  today
                    .toLocaleDateString("pt-BR", { weekday: "long" })
                    .slice(1),
                umidade: weather.data[0].rh.toString(),
                chuva: weather.data[0].precip.toString(),
                vento: weather.data[0].wind_spd.toString(),
                icon: weather.data[0].weather.icon,
              };
              setInformacoes((prevInformacoes) => [novaInformacao]);
            })
            .catch((error) => console.error("Erro ao obter clima:", error));
        },
        (error) => {
          console.error("Erro ao obter localização", error);
        }
      );
    } else {
      console.log("Geolocalização não disponível no navegador.");
    }
  }

  function obterWeekInformacoes() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          fetch(
            `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${apiKey}`
          )
            .then((response) => response.json())
            .then((weather) => {
              if (!weather.data || weather.data.length < 8) {
                console.error("Dados insuficientes da previsão do tempo.");
                return;
              }

              const informacoes: WeekInformation[] = weather.data.map(
                (dia: any) => ({
                  data: dia.datetime,
                  high_temp: dia.high_temp + "°C",
                  low_temp: dia.low_temp + "°C",
                  max_temp: dia.max_temp + "°C",
                  min_temp: dia.min_temp + "°C",
                  condicao: dia.weather.description,
                  wind_speed: dia.wind_spd,
                  humidity: dia.rh,
                  rain: dia.precip,
                })
              );

              setWeekInformacoes(informacoes);
            })
            .catch((error) => console.error("Erro ao obter clima:", error));
        },
        (error) => {
          console.error("Erro ao obter localização", error);
        }
      );
    } else {
      console.log("Geolocalização não disponível no navegador.");
    }
  }

  return (
    <div className="App">
      <div className="divLogo">
        <img
          className="logo"
          src={process.env.PUBLIC_URL + "/logo-climorld.png"}
          alt="Mundo Clima"
        />
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="divInformations">
        <Information informacoes={informacoes} />
      </div>
      <div className="divWeek">
        <WeekBar weekInformations={weekInformacoes} />
      </div>
    </div>
  );
}

export default App;
