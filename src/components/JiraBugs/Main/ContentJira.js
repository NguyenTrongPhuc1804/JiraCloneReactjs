import React from "react";
import HtmlParser from "react-html-parser";
import { useDispatch } from "react-redux";
import { GET_TASK_DETAIL_SAGA } from "../../../redux/constants/CyberBug/JiraBugTaskContants";
export default function ContentJira(props) {
  const dispatch = useDispatch();
  const { projectDetail } = props;
  const renderCard = () =>
    projectDetail?.lstTask?.map((item, index) => (
      <div
        key={index}
        className="card pb-2"
        style={{ width: "17rem", height: "auto", overflowY: "scroll" }}
      >
        <div className="card-header">{item.statusName} 3</div>
        <ul className="list-group list-group-flush">
          {item.lstTaskDeTail.map((item, index) => (
            <li
              key={index}
              style={{ cursor: "pointer", height: "auto" }}
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
              <div className="block" style={{ display: "flex" }}>
                <div className="block-left">
                  <p className="text-danger">
                    Priority: {item.priorityTask.priority}
                  </p>
                </div>
                <div className="block-right">
                  <div className="avatar-group" style={{ display: "flex" }}>
                    {item.assigness.slice(0, 2).map((item, index) => (
                      <div key={index} className="avatar">
                        <img src={item.avatar} alt={item.avatar} />
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
            </li>
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
        </ul>
      </div>
    ));
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
