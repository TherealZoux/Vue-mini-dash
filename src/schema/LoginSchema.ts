import * as yup from "yup"

export const LoginSchema = yup.object({
  username: yup.string().required("username is required"),
  password: yup.string().required("Password is required").min(6, "Min 6 chars"),
})
