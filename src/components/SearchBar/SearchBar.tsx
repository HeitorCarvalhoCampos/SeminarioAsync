import styles from './SearchBar.module.css';

function SearchBar() {
  return (
    <div className={styles.bar}>
      <input className={styles.input} type="text" placeholder="Pesquise uma cidade ou bairro..." />
      <button className={styles.button} type="submit">
        <img className={styles.lupa} src={process.env.PUBLIC_URL + "/pesquisa.svg"} alt="Submit" />
      </button>
    </div>
  );
}

export default SearchBar;