import React from 'react';
import ReactDOM from 'react-dom';
import styles from './index.css';

const App = () => <h1 className={styles.main_title}>'Hello world'</h1>;

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
