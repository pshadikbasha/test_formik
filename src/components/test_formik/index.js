import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { values } from "lodash";
import * as Yup from "yup";
const initialValues = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  mobileNumber: "",
};
const onSubmit = (values) => {
  console.log("values are", values);
};
const validationSchema = Yup.object({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  userName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  mobileNumber: Yup.string().required("Required"),
});
const SimpleUserForm = () => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <label htmlFor="firstName">FirstName</label>
        <Field name="firstName" type="text" id="firstName"></Field>
        <ErrorMessage name="firstName"></ErrorMessage>
        <label htmlFor="lastName">LastName</label>
        <Field name="lastName" type="text" id="lastName"></Field>
        <ErrorMessage name="lastName"></ErrorMessage>
        <label htmlFor="userName">UserName</label>
        <Field name="userName" type="text" id="userName"></Field>
        <ErrorMessage name="userName"></ErrorMessage>
        <label htmlFor="email">Email</label>
        <Field name="email" type="email" id="email"></Field>
        <ErrorMessage name="email"></ErrorMessage>
        <label htmlFor="mobileNumber">MobileNumber</label>
        <Field name="mobileNumber" id="mobileNumber" type="string"></Field>
        <ErrorMessage name="mobileNumber"></ErrorMessage>
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default SimpleUserForm;
