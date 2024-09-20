import Header from "@/components/Header";
import styles from "./Home.module.scss";
import TasksContainer from "@/components/TasksContainer";

export default function Home() {
  return (
    <main className={styles.container}>
      <Header />
      <TasksContainer />
    </main>
  );
}
