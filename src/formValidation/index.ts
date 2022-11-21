import { Rule } from "antd/lib/form";

export const generalValidationRules: Rule[] = [
  { required: true, message: "Field is required!" },
];

export const textInputValidationRules: Rule[] = [
  ...generalValidationRules,

  { whitespace: true },
];

export const emailValidationRules: Rule[] = [
  {
    required: true,

    message: "Field is required",
  },

  {
    type: "email",

    message: "Invalid Email Address",
  },
];
