import React, {useState} from 'react'
import Notiflix from 'notiflix'
import styles from './Searchbar.module.css'

function Searchbar({onSubmit}) {
const [query, setQuery] = useState('');

const handleChange = (e) => {
    setQuery(e.target.value);
};

const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === '') {
        Notiflix.Notify.failure('Please enter a valid search query.');
        return;
    }
    onSubmit(query);
    setQuery('');
};


  return (
    <header className={styles.searchbar}>
    <form className={styles.form} onSubmit={handleSubmit}>
      <button type="submit" className={styles.button}>
        <span className={styles.buttonLabel}>Search</span>
      </button>
      <input
        className={styles.input}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        value={query}
        onChange={handleChange}
      />
    </form>
  </header>
  );
};

export default Searchbar