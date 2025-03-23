import styles from "./DayElement.module.css";

interface DayInformation {
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
  
  interface DayInformationProps {
    dayInformations: DayInformation;
  }

function DayElement({dayInformations}: DayInformationProps) {
    return (
        <div className={styles.dayElement}>
            <p className={styles.dayText}>{dayInformations.data}</p>
            <p className={styles.dayText}>{dayInformations.condicao}</p>
            <p className={styles.dayText}>Max: {dayInformations.max_temp}</p>
            <p className={styles.dayText}>Min: {dayInformations.min_temp}</p>
        </div>
    )
}

export default DayElement;