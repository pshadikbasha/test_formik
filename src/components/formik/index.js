import "./style.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
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
};

const onSubmit = (values) => {
  console.log("values are", values);
};
const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("invalid email address").required("Required"),
  channel: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
});
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
        <label htmlFor="comments">Description</label>
        <Field as="textarea" name="comments" id="comments"></Field>
        <br />
        <label htmlFor="address">Address</label>
        <Field name="address">
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
        </Field>
        <label htmlFor="facebook">Facebook</label>
        <Field type="text" id="facebook" name="social.facebook"></Field>
        <label htmlFor="twitter">Twitter</label>
        <Field type="text" id="twitter" name="social.twitter"></Field>
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};
export default SignUp;
