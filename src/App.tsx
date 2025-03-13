import { useEffect, useState } from "react";

import CourseGoalList from "./components/CourseGoalList.tsx";
import Header from "./components/Header.tsx";
import NewGoal from "./components/NewGoal.tsx";
import Sidebar from "./components/SidebarFilter.tsx";
import { useGlobalContext } from "./components/Context.tsx";

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

  const [filter, setFilter] = useState<{
    title: string;
    type: Set<"Work" | "Study" | "Personal">;
  }>({ title: "", type: new Set() });
  const { showSidebar } = useGlobalContext();
  let filteredGoal = goals.filter(
    (goal) =>
      (filter.title === "" ||
        goal.title.toLowerCase().includes(filter.title.toLowerCase())) &&
      (filter.type.size === 0 || filter.type.has(goal.type))
  );

  function handleFilter(
    title: string,
    type: Set<"Work" | "Study" | "Personal">
  ) {
    setFilter((prev) => ({
      ...prev,
      title,
      type,
    }));
  }

  return (
    <main>
      <section>
        <Header>
          <h1>Your Course Goals</h1>
        </Header>
        <NewGoal onAddGoal={handleAddGoal} />
      </section>
      <button className="btn-filter" onClick={showSidebar}>
        Filter
      </button>

      <Sidebar onFilterGoal={handleFilter} />
      <CourseGoalList goals={filteredGoal} onDeleteGoal={handleDeleteGoal} />
    </main>
  );
}
