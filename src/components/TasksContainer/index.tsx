"use client";

import React from "react";
import styles from "./TasksContainer.module.scss";
import ModalContainer from "@/components/ModalsContainer";
import { TaskList } from "@/components/TaskList";
import { useTasks } from "@/hooks/useTasks";

export default function TasksContainer() {
  const {
    tasks,
    completedTasks,
    newTaskTitle,
    isCreateTaskModalOpen,
    setNewTaskTitle,
    setIsCreateTaskModalOpen,
    addNewTask,
    markAsCompleted,
    markAsPending,
    deleteTask,
  } = useTasks();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.tasksContainer}>
          <div className={styles.title}>Suas tarefas de hoje</div>
          <TaskList
            tasks={tasks}
            markAsCompleted={markAsCompleted}
            deleteTask={deleteTask}
          />
          <div className={styles.title}>Tarefas finalizadas</div>
          <TaskList
            tasks={completedTasks}
            markAsCompleted={markAsPending}
            deleteTask={deleteTask}
          />
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
          action={addNewTask}
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
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
            />
          </div>
        </ModalContainer>
      )}
    </div>
  );
}
