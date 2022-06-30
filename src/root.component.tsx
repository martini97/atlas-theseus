import { useEffect, useState } from "react";
import { navigateToUrl } from "single-spa";
import { hello } from "@olympus/cerberus";

import styles from "./root.styles.css";

function isPathnameLogin(pathname) {
  return window.location.pathname === "/login";
}

export default function Root(props) {
  const [isLogin, setLogin] = useState<boolean>(
    isPathnameLogin(window.location.pathname)
  );

  useEffect(() => {
    function handleRouteChanged() {
      setLogin(isPathnameLogin(window.location.pathname));
    }

    window.addEventListener("single-spa:routing-event", handleRouteChanged);

    return () => {
      window.removeEventListener(
        "single-spa:routing-event",
        handleRouteChanged
      );
    };
  });

  return (
    <nav className={styles.navbar}>
      <a href="/" onClick={navigateToUrl}>
        {props.name}
      </a>
      <button type="button" onClick={() => hello("there")}>
        interact with cerberus
      </button>
      {isLogin ? (
        <div />
      ) : (
        <a href="/login" onClick={navigateToUrl}>
          login
        </a>
      )}
    </nav>
  );
}
