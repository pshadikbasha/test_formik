import "./style.css";
import { useFormik } from "formik";

const SignUp = () => {
  const formIk = useFormik({
    initialValues: {
      name: "",
      email: "",
      channel: "",
    },
    onSubmit: (values) => {
      console.log("formik values", values);
    },
  });
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
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={formIk.handleChange}
          value={formIk.values.email}
        />
        <label htmlFor="channel">Channel</label>
        <input
          type="text"
          name="channel"
          id="channel"
          onChange={formIk.handleChange}
          value={formIk.values.channel}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default SignUp;
