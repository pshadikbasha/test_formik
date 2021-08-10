import React from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
const RadioComponent = () => {
  const initialValues = {
    data: "",
    picked: false,
  };

  //   const validationSchema = Yup.object({
  //     data: Yup.string().when("picked", {
  //       is: (data) => data,
  //       then: Yup.string().email("Invalid email address").required("Required"),
  //       otherwise: Yup.string()
  //         .matches(
  //           /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
  //           "Contains only alpha numeric."
  //         )
  //         .required("Required"),
  //     }),
  //   });
  const validationSchema = Yup.object({
    picked: Yup.bool(),
    data: Yup.string().when("picked", {
      is: (data) => !data,
      then: Yup.string()
        .matches(
          /^.[a-zA-Z0-9_]+$/,
          "UserName should contain only alphabets or numbers"
        )
        .required("Required"),
      otherwise: Yup.string()
        .email("Invalid email address")
        .required("Required"),
    }),
  });
  return (
    <div>
      <Formik initialValues={initialValues} validationSchema={validationSchema}>
        {({values}) => {
          console.log("form values",);
          // const { values } = formIk;
          return (
            <Form>
              {/* <Field type="checkbox" name="picked" value="true">
                {" "}
          </Field>*/}

              <Field type="checkbox" name="picked" />
              {`${values.picked}`}

              <Field name="data"></Field>
              <ErrorMessage name="data"></ErrorMessage>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
export default RadioComponent;
