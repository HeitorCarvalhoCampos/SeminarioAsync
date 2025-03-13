import App from '../../App'
import styles from './Information.module.css'

interface Informacao {
    temperatura: string;
    condicao: string;
    bairro: string;
  }
  
  interface InformationProps {
    informacoes: Informacao[];
  }

function Information({ informacoes }: InformationProps) {
    return (
        <div className={styles.divInfos}>
        {informacoes.length !== 0 ? (
          informacoes.map((informacao, index) => (
            <div key={index} className={styles.divInfo}>
                <p>Bairro: {informacao.bairro}</p>
                <p>Temperatura: {informacao.temperatura}</p>
                <p>Condição: {informacao.condicao}</p>
            </div>
          ))
        ) : (
          <p>Ative a localização</p>
        )}
      </div>
    );
  }
  
export default Information;
