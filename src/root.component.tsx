import { navigateToUrl } from "single-spa";

import styles from "./root.styles.css";

export default function Root(props) {
  return (
    <nav className={styles.navbar}>
      <a href="/" onClick={navigateToUrl}>
        {props.name}
      </a>
      <button>interact with cerberus</button>
      <a href="/login" onClick={navigateToUrl}>
        login
      </a>
    </nav>
  );
}
