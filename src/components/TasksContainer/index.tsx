"use client";

import React, { useState, useEffect } from "react";
import styles from "./TasksContainer.module.scss";
import ModalContainer from "../ModalsContainer";

export default function TasksContainer() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.tasksContainer}>
          <div className={styles.title}>Suas tarefas de hoje</div>
          <div className={styles.tasks}>
            {tasks.length === 0 ? "-" : <div>Há itens</div>}
          </div>
          <div className={styles.title}>Tarefas finalizadas</div>
          <div className={styles.completedTasks}>
            {completedTasks.length === 0 ? "-" : <div>Há itens</div>}
          </div>
        </div>
        <button
          className={`${styles.button} normal-bg`}
          onClick={() => setIsCreateTaskModalOpen(true)}
        >
          Adicionar nova tarefa
        </button>
      </div>
      {isCreateTaskModalOpen && (
        <ModalContainer
          action={() => console.log("oi")}
          actionName="Adicionar"
          closeModal={() => setIsCreateTaskModalOpen(false)}
          title="Nova tarefa"
          type="normal"
        >
          <div className={styles.createTaskChildren}>
            <label className={styles.label} htmlFor="inputTitle">
              Título
            </label>
            <input
              id="inputTitle"
              className={styles.input}
              placeholder="Digite"
            />
          </div>
        </ModalContainer>
      )}
    </div>
  );
}
