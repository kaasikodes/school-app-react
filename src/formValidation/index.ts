import { Rule } from "antd/lib/form";

export const generalValidationRules: Rule[] = [
  { required: true, message: "Enter field" },

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
  {
    validator: async (rule, value) => {
      let paswd =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/;

      if (!paswd.test(value))
        throw new Error(
          "Password should contain at least one digit and special character and a letter in uppercase, and least 8 characters"
        );
      // if (false) throw new Error("Something wrong!");
      return true;
    },
  },
];

export const phoneNumberValidationRule: Rule = {
  validator: async (rule, value) => {
    let paswd = /^[0-9]*$/;

    if (!value.match(paswd)) throw new Error("Only digits are allowed");
    // if (false) throw new Error("Something wrong!");
    return true;
  },
};
