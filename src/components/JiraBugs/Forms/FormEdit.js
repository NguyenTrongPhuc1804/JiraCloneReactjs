import React, { useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  EDIT_PROJECT_SAGA,
  GET_ALL_CATEGORY_SAGA,
} from "../../../redux/constants/CyberBug/CyberBugContants";
export default function FormEdit() {
  const dispatch = useDispatch();
  const valueEdit = useSelector(
    (state) => state.EditProjectReducer.listEditProject
  );
  const { arrProjectCategory } = useSelector(
    (state) => state.ProjectCategoryReducer
  );
  // ------submit form

  useEffect(() => {
    formik.setFieldValue("description", formik.values.description);
    dispatch({
      type: GET_ALL_CATEGORY_SAGA,
    });
    dispatch({
      type: "SUBMIT_FORM_EDIT_MODAL",
      funtionSubmit: formik.handleSubmit,
    });
  }, []);

  //   ------formik----
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: valueEdit?.id,
      projectName: valueEdit?.projectName,
      description: valueEdit?.description,
      categoryId: valueEdit?.categoryId,
    },
    validationSchema: "",
    onSubmit: (value) => {
      console.log(value.description);
      dispatch({
        type: EDIT_PROJECT_SAGA,
        data: value,
      });
    },
  });

  //   --------editor tiny---------
  const handleEditorChange = (content, editor) => {
    formik.setFieldValue("description", content);
  };
  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="container-fluid">
        <div className="row">
          <div className="col-md-12 col-lg-4">
            <div className="form-group">
              <p>id</p>
              <input
                className="form-control"
                id="id"
                name="id"
                disabled
                type="text"
                value={formik.values.id}
              />
            </div>
          </div>

          <div className="col-md-12 col-lg-4">
            <div className="form-group">
              <p>Project Name</p>
              <input
                className="form-control"
                onChange={formik.handleChange}
                id="projectName"
                name="projectName"
                type="text"
                value={formik.values.projectName}
              />
            </div>
          </div>
          <div className="col-md-12 col-lg-4">
            <p>Category</p>
            <div className="form-group">
              <select
                className="form-control"
                name="categoryId"
                id="categoryId"
                value={formik.values.categoryId}
                onChange={formik.handleChange}
              >
                {arrProjectCategory.map((item, index) => (
                  <option selected value={item.id} key={index}>
                    {item.projectCategoryName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12  ">
            <Editor
              value={formik.values.description}
              // initialValue={formik.values.categoryId}
              name="description"
              id="description"
              onEditorChange={handleEditorChange}
              apiKey="your-api-key"
              init={{
                height: 500,
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
        </div>
      </form>
    </div>
  );
}
