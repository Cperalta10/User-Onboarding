import * as yup from "yup";

const formSchema = yup.object().shape({
  fname: yup.string().trim().required("First name is required."),
  lname: yup.string().required("Last name is required."),
  email: yup.string().email("Valid email address required"),
  password: yup
    .string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  agree: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions"),
});

export default formSchema;
