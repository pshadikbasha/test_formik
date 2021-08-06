import "./style.css";
import { Formik, useFormik } from "formik";
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
  const formIk = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
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
          onBlur={formIk.handleBlur}
        />
        {formIk.touched.name && formIk.errors.name ? (
          <div style={{ color: "red" }}>{formIk.errors.name}</div>
        ) : null}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={formIk.handleChange}
          value={formIk.values.email}
          onBlur={formIk.handleBlur}
        />
        {formIk.touched.email && formIk.errors.email ? (
          <div style={{ color: "red" }}>{formIk.errors.email}</div>
        ) : null}
        <label htmlFor="channel">Channel</label>
        <input
          type="text"
          name="channel"
          id="channel"
          onChange={formIk.handleChange}
          value={formIk.values.channel}
          onBlur={formIk.handleBlur}
        />
        {formIk.touched.channel && formIk.errors.channel ? (
          <div style={{ color: "red" }}>{formIk.errors.channel}</div>
        ) : null}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default SignUp;
