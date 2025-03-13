import { useGlobalContext } from "./Context";
import { FormEvent, useEffect, useRef, useState } from "react";

type FilterProps = {
  onFilterGoal: (
    title: string,
    type: Set<"Work" | "Study" | "Personal">
  ) => void;
};

const Sidebar = ({ onFilterGoal }: FilterProps) => {
  const { sidebarIsOpen, closeSidebar } = useGlobalContext();
  const title = useRef<HTMLInputElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<
    Set<"Work" | "Study" | "Personal">
  >(new Set());

  function handleChangeCategory(category: "Work" | "Study" | "Personal") {
    setSelectedCategory((prev) => {
      let categories = new Set(prev);
      if (categories.has(category)) {
        categories.delete(category);
      } else {
        categories.add(category);
      }
      return categories;
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let enteredTitle = title.current!.value.trim();
    let enteredCategory = selectedCategory;
    onFilterGoal(enteredTitle, enteredCategory);
    closeSidebar();
  }

  useEffect(() => {
    if (sidebarIsOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [sidebarIsOpen]);

  return (
    <>
      {sidebarIsOpen && <div className="overlay" onClick={closeSidebar}></div>}
      <aside
        className={`${sidebarIsOpen ? "sidebar show-sidebar" : "sidebar"}`}
      >
        <div className="sidebar-header ">
          <p>
            <button className="close-btn " onClick={closeSidebar}>
              x
            </button>
          </p>
        </div>
        <div className="form-search">
          <form onSubmit={handleSubmit}>
            <p>
              <label htmlFor="title">Search</label>
              <input type="text" id="title" ref={title} />
            </p>
            <p>
              <label> Work </label>
              <input
                type="checkbox"
                id="work"
                name="category"
                checked={selectedCategory.has("Work")}
                onChange={() => handleChangeCategory("Work")}
              />
            </p>
            <p>
              <label> Study </label>
              <input
                type="checkbox"
                id="study"
                name="category"
                checked={selectedCategory.has("Study")}
                onChange={() => handleChangeCategory("Study")}
              />
            </p>
            <p>
              <label> Peronal </label>
              <input
                type="checkbox"
                id="personal"
                name="category"
                checked={selectedCategory.has("Personal")}
                onChange={() => handleChangeCategory("Personal")}
              />
            </p>
            <p>
              <button>Filter</button>
            </p>
          </form>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
