import "./style.css";
import { Formik, useFormik } from "formik";

const initialValues = {
  name: "",
  email: "",
  channel: "",
};

const onSubmit = (values) => {
  console.log("values are", values);
};

const validate = (values) => {
  let errors = {};
  if (!values.name) {
    errors.name = "Required";
  }
  if (!values.email) {
    errors.email = "Required";
  }
  if (!values.channel) {
    errors.channel = "Required";
  }
  return errors;
};
const SignUp = () => {
  const formIk = useFormik({
    initialValues,
    onSubmit,
    validate,
  });
  console.log("value errors are", formIk.errors);
  return (
    <div>
      <form action="" onSubmit={formIk.handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          onChange={formIk.handleChange}
          value={formIk.values.name}
        />
        {formIk.errors.name ? <div>{formIk.errors.name}</div> : null}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={formIk.handleChange}
          value={formIk.values.email}
        />
        {formIk.errors.email ? <div>{formIk.errors.email}</div> : null}
        <label htmlFor="channel">Channel</label>
        <input
          type="text"
          name="channel"
          id="channel"
          onChange={formIk.handleChange}
          value={formIk.values.channel}
        />
        {formIk.errors.channel ? <div>{formIk.errors.channel}</div> : null}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default SignUp;
