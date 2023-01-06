import { Rule } from "antd/lib/form";

export const generalValidationRules: Rule[] = [
  { required: true },

  // { message: "Field is required!" }, // was resulting in err
];
export const generalValidationRulesOp: Rule[] = [
  { required: false },

  // { message: "Field is required!" },
];

export const textInputValidationRulesOp: Rule[] = [
  ...generalValidationRulesOp,

  { whitespace: true },
];
export const textInputValidationRules: Rule[] = [
  ...generalValidationRules,

  { whitespace: true },
];

export const emailValidationRules: Rule[] = [
  {
    message: "Field is required",
  },
  { required: true },

  {
    type: "email",

    message: "Invalid Email Address",
  },
];
export const emailValidationRulesOp: Rule[] = [
  {
    message: "Field is required",
  },
  { required: false },

  {
    type: "email",

    message: "Invalid Email Address",
  },
];
export const passwordValidationRules: Rule[] = [
  {
    required: true,
  },
  { message: "Field is required" },
  {
    min: 8,
    message: "password must be at least 8 characters",
  },
  // {
  //   validator: (_, value) =>
  //     value && value.includes("A")
  //       ? Promise.resolve()
  //       : Promise.reject("Password does not match criteria."),
  // },
];
