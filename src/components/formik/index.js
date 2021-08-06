import "./style.css";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FastField,
} from "formik";
import * as Yup from "yup";
import ErrorMessageR from "./ErrorRequired";
const initialValues = {
  name: "",
  email: "",
  channel: "",
  comments: "",
  address: "",
  social: {
    facebook: "",
    twitter: "",
  },
  phoneNumbers: ["", ""],
  phNumbers: [""],
};

const onSubmit = (values) => {
  console.log("values are", values);
};
const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(5, "Too Long!")
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "Name can only contain Latin letters."
    )
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  channel: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  comments: Yup.string().required("Required"),
});
const validateComments = (value) => {
  let error;
  if (!value) {
    error = "Required";
  }
  return error;
};
const SignUp = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <label htmlFor="name">Name</label>
        <Field type="text" name="name" id="name" />
        <ErrorMessage name="name"></ErrorMessage>
        <label htmlFor="email">Email</label>
        <Field type="email" name="email" id="email" />
        <ErrorMessage name="email">
          {(errorMessage) => {
            return <div>{errorMessage}</div>;
          }}
        </ErrorMessage>
        <label htmlFor="channel">Channel</label>
        <Field
          as="input"
          name="channel"
          id="channel"
          placeholder="Channel Name"
        />
        <ErrorMessage name="channel" component={ErrorMessageR}></ErrorMessage>
        <label htmlFor="comments">comments</label>
        <Field
          as="textarea"
          name="comments"
          id="comments"
          validate={validateComments}
        ></Field>
        <ErrorMessage name="comments" component={ErrorMessageR}></ErrorMessage>
        <br />
        <label htmlFor="address">Address</label>
        <FastField name="address">
          {(props) => {
            console.log("props are", props);
            const { field, form, meta } = props;
            return (
              <div>
                <input id="address" {...field} />
                {meta.touched && meta.error ? <div>{meta.error}</div> : null}
              </div>
            );
          }}
        </FastField>
        <label htmlFor="facebook">Facebook</label>
        <Field type="text" id="facebook" name="social.facebook"></Field>
        <label htmlFor="twitter">Twitter</label>
        <Field type="text" id="twitter" name="social.twitter"></Field>
        <label htmlFor="primaryPhoneNumber">PrimaryNumber</label>
        <Field
          name="phoneNumbers[0]"
          type="text"
          id="primaryPhoneNumber"
        ></Field>
        <label htmlFor="secondaryPhoneNumber">SecondaryNumber</label>
        <Field
          name="phoneNumbers[1]"
          type="text"
          id="secondaryPhoneNumber"
        ></Field>
        <div>
          <label htmlFor="">List of Phone Numbers</label>
          <FieldArray name="phNumbers">
            {(fieldArrayProps) => {
              const { form, push, remove } = fieldArrayProps;
              console.log("form erros", form.errors);
              const { values } = form;
              const { phNumbers } = values;
              return (
                <div>
                  {phNumbers.map((number, idx) => {
                    return (
                      <div key={idx}>
                        <Field name={`phNumbers[${idx}]`}></Field>
                        {idx > 0 && (
                          <button onClick={() => remove(idx)}>-</button>
                        )}
                        <button onClick={() => push(" ")}>+</button>
                      </div>
                    );
                  })}
                </div>
              );
            }}
          </FieldArray>
        </div>
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};
export default SignUp;
