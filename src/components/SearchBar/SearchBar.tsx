import { useState } from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

function SearchBar({onSearch}: SearchBarProps) {

  const [query, setQuery] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch(query);
  }

  return (
    <form className={styles.bar} onClick={handleSubmit}>
      <input 
        className={styles.input} 
        type="text" 
        placeholder="Pesquise uma cidade ou bairro..." 
        value={query} onChange={(e) => setQuery(e.target.value)} 
      />
      <button className={styles.button} type="submit">
        <img className={styles.lupa} src={process.env.PUBLIC_URL + "/pesquisa.svg"} alt="Submit" />
      </button>
    </form>
  );
}

export default SearchBar;