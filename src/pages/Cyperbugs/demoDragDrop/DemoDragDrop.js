import React, { useRef, useState } from "react";
import "./style.css";
const arrItem = [
  {
    id: 1,
    name: "item 1",
  },
  {
    id: 2,
    name: "item 2",
  },
  {
    id: 3,
    name: "item 3",
  },
  {
    id: 4,
    name: "item 4",
  },
  {
    id: 5,
    name: "item 5",
  },
  {
    id: 6,
    name: "item 6",
  },
];
function DemoDragDrop() {
  const [taskList, setTaskList] = useState(arrItem);
  const tagDrag = useRef({});

  const handleDraStart = (e, task) => {
    tagDrag.current = task;
  };
  const handleDragEnter = (e, task) => {
    let taskListUpdate = [...taskList];
    let indexDragStart = taskListUpdate.findIndex(
      (item) => item.id === tagDrag.current.id
    );
    let indexDragEnter = taskListUpdate.findIndex(
      (item) => item.id === task.id
    );

    let temp = taskListUpdate[indexDragStart];
    taskListUpdate[indexDragStart] = taskListUpdate[indexDragEnter];
    taskListUpdate[indexDragEnter] = temp;
    setTaskList(taskListUpdate);
  };
  const handleDragEnd = (e) => {
    tagDrag.current = {};
    setTaskList([...taskList]);
  };
  return (
    <div className="container">
      <div className="row ">
        <div className="col-4"></div>
        <div className="col-4 p-5  bg-dark text-white">
          {taskList.map((task, index) => {
            let dragCss = task.id === tagDrag.current.id ? "draDrop" : "";
            return (
              <div
                draggable="true"
                onDragStart={(e) => {
                  handleDraStart(e, task);
                }}
                onDragEnter={(e) => {
                  handleDragEnter(e, task);
                }}
                onDragEnd={(e) => {
                  handleDragEnd(e);
                }}
                key={task.id}
                className={`bg-success p-3 mt-2 ${dragCss}`}
              >
                {task.name}
              </div>
            );
          })}
        </div>
        <div
          className="col-4  p-5 bg-dark text-white"
          //   onDrop={(e) => {
          //     console.log("over", e.target);
          //   }}
          //   draggable="true"
          //   onDragOver={(e) => {
          //     e.preventDefault();
          //     e.stopPropagation();
          //   }}
        >
          asiudasdb
        </div>
      </div>
    </div>
  );
}

export default DemoDragDrop;
