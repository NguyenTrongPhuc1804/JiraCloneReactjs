import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  CREATE_PROJECT_SAGA,
  GET_ALL_CATEGORY_SAGA,
} from "../../../redux/constants/CyberBug/CyberBugContants";
import Aos from "aos";
export default function CreateProject() {
  const dispatch = useDispatch();
  const arrProjectCategory = useSelector(
    (state) => state.ProjectCategoryReducer.arrProjectCategory
  );
  useEffect(() => {
    dispatch({
      type: GET_ALL_CATEGORY_SAGA,
    });
  }, []);

  //--------------Tiny editor
  const handleEditorChange = (content, editor) => {
    formik.setFieldValue("description", content);
  };

  //---------------------formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      projectName: "",
      description: "",
      categoryId: arrProjectCategory[0]?.id,
    },
    onSubmit: (value) => {
      dispatch({
        type: CREATE_PROJECT_SAGA,
        data: value,
      });
    },
  });
  useEffect(() => {
    Aos.init();
  }, []);
  // -----------
  return (
    <div data-aos="fade-up" data-aos-duration="1500" className="container">
      <h1 className="text-center">Create Project</h1>
      <form className="container" onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <p>Name</p>
          <input
            className="form-control"
            id="projectName"
            name="projectName"
            type="text"
            onChange={formik.handleChange}
          />
        </div>
        <div className="form-group">
          <p>Decription</p>
          <Editor
            name="description"
            id="description"
            onEditorChange={handleEditorChange}
            apiKey="your-api-key"
            initialValue=""
            init={{
              height: 400,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        </div>
        <div className="form-group">
          <select
            defaultValue={"1"}
            name="categoryId"
            id="categoryId"
            className="form-control"
            onChange={formik.handleChange}
          >
            {arrProjectCategory.map((item, index) => (
              <option value={item.id} key={item.id}>
                {item.projectCategoryName}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <button className="btn btn-outline-primary" type="submit">
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
}
