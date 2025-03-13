import { type PropsWithChildren } from "react";

type CourseGoalProps = PropsWithChildren<{
  id: number;
  title: string;
  type: "Work" | "Study" | "Personal";
  onDelete: (id: number) => void;
}>;

export default function CourseGoal({
  title,
  id,
  type,
  children,
  onDelete,
}: CourseGoalProps) {
  if (type === "Work")
    return (
      <li className="goal-item goal-item-work">
        <article>
          <div>
            <h2>{title}</h2>
            {children}
          </div>
          <button onClick={() => onDelete(id)}>Delete</button>
        </article>
      </li>
    );
  if (type === "Study")
    return (
      <li className="goal-item goal-item-study">
        <article>
          <div>
            <h2>{title}</h2>
            {children}
          </div>
          <button onClick={() => onDelete(id)}>Delete</button>
        </article>
      </li>
    );
  if (type === "Personal")
    return (
      <li className="goal-item goal-item-personal">
        <article>
          <div>
            <h2>{title}</h2>
            {children}
          </div>
          <button onClick={() => onDelete(id)}>Delete</button>
        </article>
      </li>
    );
}
