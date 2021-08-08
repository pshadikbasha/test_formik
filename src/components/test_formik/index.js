import React from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
const initialValues = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  mobileNumber: "",
  hobbies: [""],
  selectOption:[
    {
      key:'select option',
      value:''
    },
    {
      key:'cricket',
      value:''
    }
  ],
};
const onSubmit = (values, onSubmitProps) => {
  console.log("values are", values);
  onSubmitProps.setSubmitting(false);
  onSubmitProps.resetForm();
};

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(5, "Too Long!")
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "Name can only contain Alphabet letters."
    )
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(5, "Too Long!")
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "Name can only contain Latin letters."
    )
    .required("Required")
    .required("Required"),
  userName: Yup.string().required("Required"),
  email: Yup.string()
    .min(5, "TooShort")
    .max(50, "too long")
    .email("Invalid email address")
    .required("Required"),
  mobileNumber: Yup.string()
    .required("required")
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, "to short")
    .max(10, "to long"),
});
const SimpleUserForm = () => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {(formik) => {
        return (
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
            <label htmlFor="hobbies">Hobbies</label>
            <FieldArray name="hobbies">
              {(fieldArrayProps) => {
                console.log(fieldArrayProps);
                const { form, remove, push } = fieldArrayProps;
                const { values } = form;
                const { hobbies } = values;
                return (
                  <div>
                    {hobbies.map((hobby, idx) => {
                      return (
                        <div>
                          <Field name={`hobbies[${idx}]`}></Field>
                          <button onClick={() => push("")}>+</button>
                          {idx > 0 && (
                            <button onClick={() => remove(idx)}>-</button>
                          )}
                         
                        </div>
                      );
                    })}
                    
                  </div>
                );
              }}
            </FieldArray>
            <button
              type="submit"
              disabled={!(formik.isSubmitting || formik.isValid)}
            >
              Submit
            </button>
            <button type="reset">Reset</button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SimpleUserForm;
