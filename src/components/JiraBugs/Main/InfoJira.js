import React from "react";

export default function InfoJira(props) {
  const renderAvatar = () =>
    props.members?.map((item, index) => (
      <div key={index} className="avatar">
        <img src={item.avatar} alt="123" />
      </div>
    ));
  return (
    <div className="info" style={{ display: "flex" }}>
      <div className="search-block">
        <input className="search" />
        <i className="fa fa-search" />
      </div>
      <div className="avatar-group" style={{ display: "flex" }}>
        {renderAvatar()}
      </div>
      <div style={{ marginLeft: 20 }} className="text">
        Only My Issues
      </div>
      <div style={{ marginLeft: 20 }} className="text">
        Recently Updated
      </div>
    </div>
  );
}
