import { useEffect, useState } from "react";

import CourseGoalList from "./components/CourseGoalList.tsx";
import Header from "./components/Header.tsx";
import NewGoal from "./components/NewGoal.tsx";

export type CourseGoal = {
  title: string;
  description: string;
  id: number;
  type: "Work" | "Study" | "Personal";
};

export default function App() {
  const [goals, setGoals] = useState<CourseGoal[]>([]);

  useEffect(() => {
    const savedGoals = JSON.parse(localStorage.getItem("goals") || "[]");
    setGoals(savedGoals);
  }, []);

  function handleAddGoal(
    goal: string,
    summary: string,
    type: "Work" | "Study" | "Personal"
  ) {
    const newGoal: CourseGoal = {
      id: Math.random(),
      title: goal,
      description: summary,
      type,
    };

    setGoals((prevGoals) => {
      const updatedGoals = [...prevGoals, newGoal];
      localStorage.setItem("goals", JSON.stringify(updatedGoals));
      return updatedGoals;
    });
  }

  function handleDeleteGoal(id: number) {
    setGoals((prevGoals) => {
      const updatedGoals = prevGoals.filter((goal) => goal.id !== id);
      localStorage.setItem("goals", JSON.stringify(updatedGoals));
      return updatedGoals;
    });
  }

  return (
    <main>
      <section>
        <Header>
          <h1>Your Course Goals</h1>
        </Header>
        <NewGoal onAddGoal={handleAddGoal} />
      </section>

      <CourseGoalList goals={goals} onDeleteGoal={handleDeleteGoal} />
    </main>
  );
}
