import App from '../../App'

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
        <div className="Infomations">
        {informacoes.length !== 0 ? (
          informacoes.map((informacao, index) => (
            <div key={index}>
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
