import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContentJira from "../../../components/JiraBugs/Main/ContentJira";
import HeaderJira from "../../../components/JiraBugs/Main/HeaderJira";
import InfoJira from "../../../components/JiraBugs/Main/InfoJira";
import HtmlParser from "react-html-parser";
function IndexJira(props) {
  const dispatch = useDispatch();
  const { projectDetail } = useSelector((state) => state.EditProjectReducer);
  // console.log("pjdt", projectDetail);
  useEffect(() => {
    const { projectId } = props.match.params;
    dispatch({
      type: "GET_PROJECT_DETAIL_SAGA",
      projectId: projectId,
    });
  }, []);
  return (
    <div>
      <HeaderJira projectName={projectDetail.projectName} />
      <h3> {projectDetail.projectName}</h3>
      <p>{HtmlParser(projectDetail.description)}</p>
      <InfoJira members={projectDetail.members} />
      <ContentJira projectDetail={projectDetail} />
    </div>
  );
}

export default IndexJira;
