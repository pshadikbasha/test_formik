import "./style.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
const initialValues = {
  name: "",
  email: "",
  channel: "",
};

const onSubmit = (values) => {
  console.log("values are", values);
};
const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("invalid email address").required("Required"),
  channel: Yup.string().required("Required"),
});
const SignUp = () => {
  //   console.log("value errors are", formIk.errors);
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
        <ErrorMessage name="email"></ErrorMessage>
        <label htmlFor="channel">Channel</label>
        <Field type="text" name="channel" id="channel" />
        <ErrorMessage name="channel"></ErrorMessage>
        <br />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};
export default SignUp;
