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
      event.currentTarget.reset();
      setWarningBox(null);
      onAddGoal(enteredGoal, enteredSummary, enteredCategory);
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
          <input id="goal" type="text" ref={goal} />
        </p>
        <p>
          <label htmlFor="summary">Short summary</label>
          <input id="summary" type="text" ref={summary} />
        </p>
        <p>
          <label htmlFor="work">Work</label>
          <input
            type="radio"
            name="category"
            value="Work"
            checked={selectedCategory === "Work"}
            onChange={(type) =>
              setSelectedCategory(
                type.target.value as "Work" | "Study" | "Personal"
              )
            }
          />
        </p>
        <p>
          <label htmlFor="study">Stydy</label>
          <input
            type="radio"
            name="category"
            value="Study"
            checked={selectedCategory === "Study"}
            onChange={(type) =>
              setSelectedCategory(
                type.target.value as "Work" | "Study" | "Personal"
              )
            }
          />
        </p>
        <p>
          <label htmlFor="personal">Personal</label>
          <input
            type="radio"
            name="category"
            value="Personal"
            checked={selectedCategory === "Personal"}
            onChange={(type) =>
              setSelectedCategory(
                type.target.value as "Work" | "Study" | "Personal"
              )
            }
          />
        </p>
        <p>
          <button>Add Goal</button>
        </p>
      </form>
      {warningBox}
    </div>
  );
}
