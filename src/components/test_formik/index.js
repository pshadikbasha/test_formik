import React from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
const initialValues = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  mobileNumber: "",
  hobbies: [
    {
      hobbyName: "",
      selectOption: "",
    },
  ],
  data: "",
  picked: false,
};
const onSubmit = (values, onSubmitProps) => {
  alert(JSON.stringify(values, null, 2));
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

  lastName: Yup.lazy((value) => {
    if (value) {
      return Yup.string()
        .min(2, "Too Short!")
        .max(5, "Too Long!")
        .matches(
          /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
          "Name can only alpha letters."
        );
    }
    return Yup.mixed().notRequired();
  }),
  userName: Yup.string()
    .min(3, "userName is Short")
    .max(6, "UserName is long")
    .matches(
      /^.[a-zA-Z0-9_]+$/,
      "UserName should contain only alphabets or numbers"
    )
    .required("Required"),
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

  // hobbies: Yup.array().of(Yup.string().required("Required")),
  hobbies: Yup.array().of(
    Yup.object().shape({
      hobbyName: Yup.string().required("Required"),
      selectOption: Yup.string().when("hobbyName", {
        is: (value) => value && value !== null,
        then: Yup.string().required("Required"),
      }),
    })
  ),
  picked: Yup.bool(),
  data: Yup.string().when("picked", {
    is: (data) => !data,
    then: Yup.string()
      .matches(
        /^.[a-zA-Z0-9_]+$/,
        "UserName should contain only alphabets or numbers"
      )
      .required("Required"),
    otherwise: Yup.string().email("Invalid email address").required("Required"),
  }),
});

const SimpleUserForm = () => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {(formik) => {
        console.log("formik data", formik);
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
            `<Field name="email" type="email" id="email"></Field>
            <ErrorMessage name="email"></ErrorMessage>`
            <label htmlFor="mobileNumber">MobileNumber</label>
            <Field name="mobileNumber" id="mobileNumber" type="string"></Field>
            <ErrorMessage name="mobileNumber"></ErrorMessage>
            <label htmlFor="hobbies">Hobbies</label>
            <FieldArray name="hobbies">
              {(fieldArrayProps) => {
                console.log("formvalues", fieldArrayProps);
                const { form, remove, push } = fieldArrayProps;
                const { values } = form;
                const { hobbies, picked } = values;
                console.log("picked values", picked);
                return (
                  <div>
                    {hobbies.map((hobby, idx) => {
                      return (
                        <div key={idx}>
                          <Field name={`hobbies.${idx}.hobbyName]`}></Field>
                          <ErrorMessage
                            name={`hobbies.${idx}.hobbyName`}
                          ></ErrorMessage>
                          <Field
                            as="select"
                            name={`hobbies.${idx}.selectOption`}
                          >
                            <option value="" label="Select">
                              Select{" "}
                            </option>
                            <option value="sports" label="sports">
                              {" "}
                              sports
                            </option>
                          </Field>
                          <ErrorMessage
                            name={`hobbies.${idx}.selectOption`}
                          ></ErrorMessage>
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

            <Field type="checkbox" name="picked"></Field>
            <Field name="data"></Field>
            <ErrorMessage name="data"></ErrorMessage>
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
