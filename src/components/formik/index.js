import "./style.css";
import { useFormik } from "formik";

const SignUp = () => {
  const formIk = useFormik({});
  return (
    <div>
      <form action="">
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="channel">Channel</label>
        <input type="text" name="channel" id="channel" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default SignUp;
