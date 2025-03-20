import { useEffect, useState } from 'react';
import App from '../../App'
import styles from './Information.module.css'

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
  
  interface InformationProps {
    informacoes: Informacao[];
  }

function Information({ informacoes }: InformationProps) {

  const [translatedDescriptions, setTranslatedDescriptions] = useState<string[]>([]);

  useEffect(() => {
    async function fetchTranslations() {
      if (informacoes.length > 0) {
        const translated = await Promise.all(
          informacoes.map(async (informacao) => {
            const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=pt&dt=t&q=${encodeURIComponent(informacao.descricao)}`;
            const response = await fetch(url);
            const data = await response.json();
            return data[0][0][0];
          })
        );
        setTranslatedDescriptions(translated);
      }
    }

    fetchTranslations();
  }, [informacoes]);

    return (
        <div className={styles.divInfos}>
        {informacoes.length !== 0 ? (
          informacoes.map((informacao, index) => (
            <div key={index} className={styles.divInfo}>
              <div className={styles.divResultado}>
                <div>
                  <img className={styles.icon} src={`https://www.weatherbit.io/static/img/icons/${informacoes[0].icon}.png`} alt="Icone do Clima" />
                </div>
                <div className={styles.divTemperatura}>
                  <p className={styles.temperatura}>{informacao.temperatura}<span className={styles.grau}>°C</span></p>
                </div>
                <div className={styles.divExtras}>
                  <div className={styles.extras}>
                    <p className={styles.extra}>Chuva: {informacao.chuva}%</p>
                    <p className={styles.extra}>Umidade: {informacao.umidade}%</p>
                    <p className={styles.extra}>Vento: {informacao.vento} km/h</p>
                  </div>
                </div>
              </div>
              

              <p className={styles.cidade}>Cidade: {informacao.cidade}</p>
              <p className={styles.descricao}>Descrição: {translatedDescriptions[index] || "Aguarde..."}</p>
              <p className={styles.diaSemana}>Dia da semana: {informacao.diaSemana}</p>
              
            </div>
          ))
        ) : (
          <p>Ative a localização</p>
        )}
      </div>
    );
  }
  
export default Information;
