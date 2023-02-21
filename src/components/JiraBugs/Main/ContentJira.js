import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import HtmlParser from "react-html-parser";
import { useDispatch } from "react-redux";
import {
  GET_TASK_DETAIL_SAGA,
  UPDATE_STATUS_SAGA,
} from "../../../redux/constants/CyberBug/JiraBugTaskContants";
export default function ContentJira(props) {
  const dispatch = useDispatch();
  const { projectDetail } = props;
  const handleDraEnd = (result) => {
    console.log("e", result);
    let { projectId, taskId } = JSON.parse(result.draggableId);
    let { destination, source } = result;
    if (!result.destination) {
      return;
    }
    if (
      source.index === destination.index &&
      source.id === destination.droppableId
    ) {
      return;
    }
    dispatch({
      type: UPDATE_STATUS_SAGA,
      projectId: projectId,
      data: {
        statusId: destination.droppableId,
        taskId: taskId,
      },
    });
  };
  const renderCard = () => {
    return (
      <DragDropContext onDragEnd={handleDraEnd}>
        {projectDetail?.lstTask?.map((item, index) => {
          return (
            <Droppable key={index} droppableId={item.statusId}>
              {(provided) => {
                return (
                  <div
                    className="card pb-2"
                    style={{
                      width: "17rem",
                      height: "auto",
                      overflowY: "scroll",
                    }}
                  >
                    <div className="card-header">{item.statusName}</div>
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      key={index}
                      className="list-group list-group-flush"
                      style={{ height: "100%" }}
                    >
                      {item.lstTaskDeTail.map((item, index) => (
                        <Draggable
                          key={item.taskId.toString()}
                          index={index}
                          draggableId={JSON.stringify({
                            projectId: item.projectId,
                            taskId: item.taskId,
                          })}
                        >
                          {(provided) => {
                            return (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                key={index}
                                // style={{ height: "auto" }}
                                className="list-group-item "
                                data-toggle="modal"
                                data-target="#infoModal"
                                onClick={() => {
                                  dispatch({
                                    type: GET_TASK_DETAIL_SAGA,
                                    idTask: item.taskId,
                                  });
                                }}
                              >
                                <span className="font-weight-bold">
                                  Task name: {HtmlParser(item.taskName)}
                                </span>
                                <div
                                  className="block"
                                  style={{ display: "flex" }}
                                >
                                  <div className="block-left">
                                    <p className="text-danger">
                                      Priority: {item.priorityTask.priority}
                                    </p>
                                  </div>
                                  <div className="block-right">
                                    <div
                                      className="avatar-group"
                                      style={{ display: "flex" }}
                                    >
                                      {item.assigness
                                        .slice(0, 2)
                                        .map((item, index) => (
                                          <div key={index} className="avatar">
                                            <img
                                              src={item.avatar}
                                              alt={item.avatar}
                                            />
                                          </div>
                                        ))}
                                      {item.assigness > 2 ? (
                                        <span className="mt-3">...</span>
                                      ) : (
                                        ""
                                      )}
                                      {/* <span className="mt-3">...</span> */}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          }}
                        </Draggable>
                      ))}
                      {/* <li className="list-group-item">
            <p>
              Each issue has a single reporter but can have multiple assignees
            </p>
            <div className="block" style={{ display: "flex" }}>
              <div className="block-left">
                <i className="fa fa-check-square" />
                <i className="fa fa-arrow-up" />
              </div>
              <div className="block-right">
                <div className="avatar-group" style={{ display: "flex" }}>
                  <div className="avatar">
                    <img
                      src={require("../../../assets/img/download (1).jfif")}
                      alt="123"
                    />
                  </div>
                  <div className="avatar">
                    <img
                      src={require("../../../assets/img/download (2).jfif")}
                      alt="123"
                    />
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className="list-group-item">Vestibulum at eros</li> */}
                      {provided.placeholder}
                    </div>
                  </div>
                );
              }}
            </Droppable>
          );
        })}
      </DragDropContext>
    );
  };

  return (
    <div className="content" style={{ display: "flex" }}>
      {renderCard()}
    </div>
  );
}

{
  /* <div className="card" style={{ width: "17rem", height: "25rem" }}>
<div className="card-header">BACKLOG 3</div>
<ul className="list-group list-group-flush">
  <li
    className="list-group-item"
    data-toggle="modal"
    data-target="#infoModal"
    style={{ cursor: "pointer" }}
  >
    <p>
      Each issue has a single reporter but can have multiple assignees
    </p>
    <div className="block" style={{ display: "flex" }}>
      <div className="block-left">
        <i className="fa fa-bookmark" />
        <i className="fa fa-arrow-up" />
      </div>
      <div className="block-right">
        <div className="avatar-group" style={{ display: "flex" }}>
          <div className="avatar">
            <img
              src={require("../../../assets/img/download (1).jfif")}
              alt="123"
            />
          </div>
          <div className="avatar">
            <img
              src={require("../../../assets/img/download (2).jfif")}
              alt="123"
            />
          </div>
        </div>
      </div>
    </div>
  </li>
  <li className="list-group-item">
    <p>
      Each issue has a single reporter but can have multiple assignees
    </p>
    <div className="block" style={{ display: "flex" }}>
      <div className="block-left">
        <i className="fa fa-check-square" />
        <i className="fa fa-arrow-up" />
      </div>
      <div className="block-right">
        <div className="avatar-group" style={{ display: "flex" }}>
          <div className="avatar">
            <img
              src={require("../../../assets/img/download (1).jfif")}
              alt="123"
            />
          </div>
          <div className="avatar">
            <img
              src={require("../../../assets/img/download (2).jfif")}
              alt="123"
            />
          </div>
        </div>
      </div>
    </div>
  </li>
  <li className="list-group-item">Vestibulum at eros</li>
</ul>
</div>
<div className="card" style={{ width: "17rem", height: "25rem" }}>
<div className="card-header">SELECTED FOR DEVELOPMENT 2</div>
<ul className="list-group list-group-flush">
  <li className="list-group-item">Cras justo odio</li>
  <li className="list-group-item">Dapibus ac facilisis in</li>
</ul>
</div>
<div className="card" style={{ width: "17rem", height: "25rem" }}>
<div className="card-header">IN PROGRESS 2</div>
<ul className="list-group list-group-flush">
  <li className="list-group-item">Cras justo odio</li>
  <li className="list-group-item">Dapibus ac facilisis in</li>
</ul>
</div>
<div className="card" style={{ width: "17rem", height: "25rem" }}>
<div className="card-header">DONE 3</div>
<ul className="list-group list-group-flush">
  <li className="list-group-item">Cras justo odio</li>
  <li className="list-group-item">Dapibus ac facilisis in</li>
  <li className="list-group-item">Vestibulum at eros</li>
</ul>
</div> */
}
