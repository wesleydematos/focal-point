import React, { useState } from "react";
import { Task } from "@/types";
import ModalContainer from "@/components/ModalsContainer";
import styles from "./TaskList.module.scss";
import { FiTrash } from "react-icons/fi";

export function TaskList({
  tasks,
  markAsCompleted,
  deleteTask,
}: {
  tasks: Task[];
  markAsCompleted: (id: string) => void;
  deleteTask: (id: string) => void;
}) {
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openDeleteModal = (task: Task) => {
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setTaskToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const confirmDeleteTask = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete.id);
      closeDeleteModal();
    }
  };

  return (
    <div className={styles.taskList}>
      {tasks.length === 0 ? (
        <p className={styles.none}>-</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id} className={styles.taskItem}>
            <div className={styles.checkBoxContainer}>
              <input
                className={styles.finished}
                type="checkbox"
                checked={task.finished}
                onChange={() => markAsCompleted(task.id)}
              />
              <span
                className={`${styles.title} ${
                  task.finished ? styles.halfLineThrough : ""
                }`}
              >
                {task.title}
              </span>
            </div>
            <button
              className={styles.button}
              onClick={() => openDeleteModal(task)}
            >
              <FiTrash size={24} color="#d7dde9" />
            </button>
          </div>
        ))
      )}

      {isDeleteModalOpen && (
        <ModalContainer
          action={confirmDeleteTask}
          actionName="Deletar"
          closeModal={closeDeleteModal}
          title="Deletar tarefa"
          type="danger"
        >
          <p>Tem certeza que deseja deletar esta tarefa?</p>
        </ModalContainer>
      )}
    </div>
  );
}
