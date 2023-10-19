import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
    return(
        <footer className={styles.footer}>
            <p>
                &copy; {new Date().getFullYear()} E.Goette
            </p>
            <p>
                <a href="https://github.com/eliasgoette">GitHub</a>
                &emsp;
                <a href="https://www.linkedin.com/in/elias-goette-b1524b20a">LinkedIn</a>
            </p>
        </footer>
    );
}