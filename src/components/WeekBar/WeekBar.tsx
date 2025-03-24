import style from "./WeekBar.module.css";
import DayElement from "../DayElement/DayElement";

interface WeekInformation {
  data: string;
  max_temp: string;
  min_temp: string;
  condicao: string;
  icon: string;
}

interface WeekInformationProps {
  weekInformations: WeekInformation[];
}

function WeekBar({ weekInformations }: WeekInformationProps) {
  return (
    <div className={style.weekBar}>
      {weekInformations.length >= 8 ? (
        <>
          {weekInformations.slice(0, 8).map((info, index) => (
            <DayElement key={index} dayInformations={info} />
          ))}
        </>
      ) : (
        <p>Carregando previsão da semana...</p>
      )}
    </div>
  );
}


export default WeekBar;
