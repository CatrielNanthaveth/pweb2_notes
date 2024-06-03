import Link from "next/link";
import styles from "@/styles/home.module.css";

export default function Home() {
  return (
    <>
      <h1 className={styles.main}>Notes by Carti {'<3'}</h1>

      <ul className={styles.button_group}>
        <Link className={styles.link} href={'/active'}><li className={styles.button}>Active</li></Link>
        <Link className={styles.link} href={'/archived'}><li className={styles.button}>Archived</li></Link>
        <Link className={styles.link} href={'/create'}><li className={styles.button}>New note</li></Link>
      </ul>
    </>
  );
}
