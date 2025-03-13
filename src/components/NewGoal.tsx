import { ReactNode, useRef, useState, type FormEvent } from "react";
import InfoBox from "./InfoBox.tsx";

type NewGoalProps = {
  onAddGoal: (
    goal: string,
    summary: string,
    type: "Work" | "Study" | "Personal"
  ) => void;
};

export default function NewGoal({ onAddGoal }: NewGoalProps) {
  const goal = useRef<HTMLInputElement>(null);
  const summary = useRef<HTMLInputElement>(null);
  const [warningBox, setWarningBox] = useState<ReactNode>(null);
  const [selectedCategory, setSelectedCategory] = useState<
    "Work" | "Study" | "Personal"
  >("Work");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const enteredGoal = goal.current!.value.trim();
    const enteredSummary = summary.current!.value;
    const enteredCategory = selectedCategory as "Work" | "Study" | "Personal";

    if (enteredGoal && enteredSummary && enteredCategory) {
      onAddGoal(enteredGoal, enteredSummary, enteredCategory);
      event.currentTarget.reset();
      setSelectedCategory("Work");
      setWarningBox(null);
    } else {
      setWarningBox(
        <InfoBox mode="warning" severity="high">
          You cannot add an empty goal!
        </InfoBox>
      );
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="goal">Your goal</label>
          <input id="goal" type="text" ref={goal} maxLength={50} />
        </p>
        <p>
          <label htmlFor="summary">Short summary</label>
          <input id="summary" type="text" ref={summary} maxLength={100} />
        </p>
        <p>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) =>
              setSelectedCategory(
                e.target.value as "Work" | "Study" | "Personal"
              )
            }
          >
            <option value="Work">Work</option>
            <option value="Study">Study</option>
            <option value="Personal">Personal</option>
          </select>
        </p>

        <p>
          <button>Add Goal</button>
        </p>
      </form>
      {warningBox}
    </div>
  );
}
