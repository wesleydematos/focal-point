import { useState, useEffect } from "react";
import { Task } from "@/types";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    const storedCompletedTasks = localStorage.getItem("completedTasks");

    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
    if (storedCompletedTasks) {
      setCompletedTasks(JSON.parse(storedCompletedTasks));
    }
  }, []);

  const addNewTask = () => {
    if (newTaskTitle.trim() === "") return;

    const newTask: Task = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
      title: newTaskTitle,
      finished: false,
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    setNewTaskTitle("");
    setIsCreateTaskModalOpen(false);
  };

  const markAsCompleted = (taskId: string) => {
    const taskToComplete = tasks.find((task) => task.id === taskId);
    if (taskToComplete) {
      taskToComplete.finished = true;
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      const updatedCompletedTasks = [...completedTasks, taskToComplete];
      setCompletedTasks(updatedCompletedTasks);
      localStorage.setItem(
        "completedTasks",
        JSON.stringify(updatedCompletedTasks)
      );
    }
  };

  const markAsPending = (taskId: string) => {
    const taskToUncomplete = completedTasks.find((task) => task.id === taskId);
    if (taskToUncomplete) {
      taskToUncomplete.finished = false;
      const updatedCompletedTasks = completedTasks.filter(
        (task) => task.id !== taskId
      );
      setCompletedTasks(updatedCompletedTasks);
      localStorage.setItem(
        "completedTasks",
        JSON.stringify(updatedCompletedTasks)
      );

      const updatedTasks = [...tasks, taskToUncomplete];
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };

  const deleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    const updatedCompletedTasks = completedTasks.filter(
      (task) => task.id !== taskId
    );
    setCompletedTasks(updatedCompletedTasks);
    localStorage.setItem(
      "completedTasks",
      JSON.stringify(updatedCompletedTasks)
    );
  };

  return {
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
  };
}
