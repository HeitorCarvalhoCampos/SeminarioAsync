import styles from "./DayElement.module.css";

interface DayInformation {
    data: string;
    max_temp: string;
    min_temp: string;
    condicao: string;
    icon: string;
  }
  
  interface DayInformationProps {
    dayInformations: DayInformation;
  }

function DayElement({dayInformations}: DayInformationProps) {
    return (
        <div className={styles.dayElement}>
            <p className={styles.dayText}>{dayInformations.data}</p>
            <div className={styles.divimg}>
              <img className={styles.icon} src={`https://www.weatherbit.io/static/img/icons/${dayInformations.icon}.png`} alt="Icone do Clima" />
            </div>
            <p className={styles.dayText}>Max: {dayInformations.max_temp}</p>
            <p className={styles.dayText}>Min: {dayInformations.min_temp}</p>
        </div>
    )
}

export default DayElement;