"use client";
import "./App.css";
import { z } from "zod";

import {
  FormBody,
  FormContent,
  FormixFormProvider,
  FormDescription,
  FormFlexFields,
  FormFooter,
  FormHeader,
  FormTitle,
  ISchemaFormProps,
  ThemeProvider,
} from "@adimis/react-formix";
import "@adimis/react-formix/dist/style.css";

import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const supabaseUrl: string = process.env.REACT_APP_SUPABASE_URL!;
const supabaseKey: string = process.env.REACT_APP_SUPABASE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

interface SignUp {
  username: string;
  email: string;
  address: string;
  phone: string;
  password: string;
  gender: string;
  terms: boolean;
  file: File;
  date: Date;
  year: number;
  expertise: string[];
}

function App() {
  const [user, setUser] = useState<SignUp>();

  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.from("users").select().limit(1).single();
      setUser(data);
    }
    getUser();
  }, []);

  const handleSubmit = async (values: SignUp) => {
    console.log("FORM DATA: ", values);

    const { data, error } = await supabase
      .from("users")
      .update(values)
      .eq("id", "eb76e409-39f6-43b0-b5eb-5ddfec1786ba")
      .select();

    if (error) {
      console.log("Update Error");
    }
    if (data) {
      console.log("Update Success");
    }
  };

  const upload = () => {};

  const schemaFormProps: ISchemaFormProps<SignUp> = {
    formLabel: "Example Barebone Form",
    formSlug: "example-barebone-form",
    devTools: true,
    formDisabled: false,
    enableConditionalRendering: true,
    schema: [
      {
        key: "username",
        label: "Username",
        description: "Enter your desired username.",
        autoComplete: "username",
        type: "text",
        placeholder: "Your username",
        defaultValue: "",
        validations: z
          .string()
          .min(1, "Username is required")
          .max(20, "Username must not exceed 20 characters"),
        render: ({
          formDisabled,
          formItem,
          formMethods,
          submitButtonLoading,
        }) => (
          <input
            type={formItem.type}
            id={formItem.key}
            disabled={formDisabled || submitButtonLoading}
            style={{
              width: "100%",
              height: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              margin: "5px 0",
            }}
            {...formMethods.register(formItem.key)}
          />
        ),
      },
      {
        key: "email",
        label: "Email",
        description: "Enter your email address.",
        autoComplete: "email",
        type: "email",
        placeholder: "Your email",
        defaultValue: "",
        validations: z
          .string()
          .email("Enter a valid email address")
          .min(1, "Email is required"),
        render: ({
          formDisabled,
          formItem,
          formMethods,
          submitButtonLoading,
        }) => (
          <input
            type={formItem.type}
            id={formItem.key}
            disabled={formDisabled || submitButtonLoading}
            style={{
              width: "100%",
              height: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              margin: "5px 0",
            }}
            {...formMethods.register(formItem.key)}
          />
        ),
      },
      {
        key: "address",
        label: "Address",
        description: "Enter your full address.",
        autoComplete: "address-line1",
        type: "text",
        placeholder: "Your address",
        defaultValue: "",
        validations: z
          .string()
          .min(10, "Address should be at least 10 characters"),
        render: ({
          formDisabled,
          formItem,
          formMethods,
          submitButtonLoading,
        }) => (
          <input
            type={formItem.type}
            id={formItem.key}
            disabled={formDisabled || submitButtonLoading}
            style={{
              width: "100%",
              height: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              margin: "5px 0",
            }}
            {...formMethods.register(formItem.key)}
          />
        ),
      },
      {
        key: "phone",
        label: "Phone",
        description: "Enter your phone number with country code.",
        autoComplete: "tel",
        type: "tel",
        placeholder: "+1234567890",
        defaultValue: "",
        validations: z
          .string()
          .regex(/^\+?(\d.*){10,}$/, "Enter a valid phone number"),
        render: ({
          formDisabled,
          formItem,
          formMethods,
          submitButtonLoading,
        }) => (
          <input
            type={formItem.type}
            id={formItem.key}
            disabled={formDisabled || submitButtonLoading}
            style={{
              width: "100%",
              height: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              margin: "5px 0",
            }}
            {...formMethods.register(formItem.key)}
          />
        ),
      },
      {
        key: "password",
        label: "Password",
        description: "Enter a strong password.",
        autoComplete: "new-password",
        type: "password",
        placeholder: "Your password",
        defaultValue: "",
        validations: z
          .string()
          .min(8, "Password should be at least 8 characters")
          .max(20, "Password must not exceed 20 characters"),
        displayConditions: [
          {
            dependentField: "email",
            dependentFieldValue: "admin@adimis.in",
            operator: "===",
          },
        ],
        removeValidationConditions: [
          {
            dependentField: "email",
            dependentFieldValue: "admin@adimis.in",
            operator: "!==",
          },
        ],
        render: ({
          formDisabled,
          formItem,
          formMethods,
          submitButtonLoading,
        }) => (
          <input
            type={formItem.type}
            id={formItem.key}
            disabled={formDisabled || submitButtonLoading}
            style={{
              width: "100%",
              height: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              margin: "5px 0",
            }}
            {...formMethods.register(formItem.key)}
          />
        ),
      },
      {
        key: "gender",
        label: "Gender",
        description: "Enter your gender.",
        autoComplete: "gender",
        type: "text",
        placeholder: "Your gender",
        defaultValue: "",
        validations: z
          .string()
          .min(1, "Gender should be at least 1 characters")
          .max(6, "Gender must not exceed 6 characters"),

        render: ({
          formDisabled,
          formItem,
          formMethods,
          submitButtonLoading,
        }) => (
          <input
            type={formItem.type}
            id={formItem.key}
            disabled={formDisabled || submitButtonLoading}
            style={{
              width: "100%",
              height: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              margin: "5px 0",
            }}
            {...formMethods.register(formItem.key)}
          />
        ),
      },
      {
        key: "terms",
        label: "Terms",
        description: "Select terms",
        autoComplete: "terms",
        type: "text",
        placeholder: "Terms",
        defaultValue: true,

        render: ({
          formDisabled,
          formItem,
          formMethods,
          submitButtonLoading,
        }) => (
          <input
            type={formItem.type}
            id={formItem.key}
            disabled={formDisabled || submitButtonLoading}
            style={{
              width: "100%",
              height: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              margin: "5px 0",
            }}
            {...formMethods.register(formItem.key)}
          />
        ),
      },
      {
        key: "file",
        label: "File",
        description: "Upload a file.",
        autoComplete: "file",
        type: "file",
        placeholder: "File",
        defaultValue: "",

        render: ({
          formDisabled,
          formItem,
          formMethods,
          submitButtonLoading,
        }) => (
          <div
            style={{
              width: "100%",
              height: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              margin: "5px 0",
            }}
          >
            <input
              type={formItem.type}
              id={formItem.key}
              disabled={formDisabled || submitButtonLoading}
              style={{
                width: "100%",
                height: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "10px",
                margin: "5px 0",
              }}
              {...formMethods.register(formItem.key)}
            />
            <button onClick={upload} type="button" className="mt-5">
              Upload File
            </button>
          </div>
        ),
      },
      {
        key: "date",
        label: "Date",
        description: "Enter a Date",
        autoComplete: "date",
        type: "date",
        placeholder: "Date",
        defaultValue: "",
        validations: z.coerce.date(),

        render: ({
          formDisabled,
          formItem,
          formMethods,
          submitButtonLoading,
        }) => (
          <input
            type={formItem.type}
            id={formItem.key}
            disabled={formDisabled || submitButtonLoading}
            style={{
              width: "100%",
              height: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              margin: "5px 0",
            }}
            {...formMethods.register(formItem.key)}
          />
        ),
      },
      {
        key: "year",
        label: "Year",
        description: "Enter a year.",
        autoComplete: "year",
        type: "number",
        placeholder: "Year",
        defaultValue: 2000,
        validations: z.string(),

        render: ({
          formDisabled,
          formItem,
          formMethods,
          submitButtonLoading,
        }) => (
          <input
            type={formItem.type}
            id={formItem.key}
            disabled={formDisabled || submitButtonLoading}
            style={{
              width: "100%",
              height: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              margin: "5px 0",
            }}
            {...formMethods.register(formItem.key)}
          />
        ),
      },
      {
        key: "expertise",
        label: "Expertise",
        description: "Enter expertise.",
        autoComplete: "expertise",
        type: "array",
        placeholder: "Expertise",
        defaultValue: [],
        validations: z.array(z.string()),

        render: ({
          formDisabled,
          formItem,
          formMethods,
          submitButtonLoading,
        }) => (
          <input
            type={formItem.type}
            id={formItem.key}
            disabled={formDisabled || submitButtonLoading}
            style={{
              width: "100%",
              height: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              margin: "5px 0",
            }}
            {...formMethods.register(formItem.key)}
          />
        ),
      },
    ],
    defaultValues: {
      username: user?.username,
      email: user?.email,
      address: user?.address,
      phone: user?.phone,
      password: user?.password,
      gender: user?.gender,
      terms: user?.terms,
      file: user?.file,
      date: user?.date,
      year: user?.year,
      expertise: user?.expertise,
    },
    onSubmit: (values) => {
      handleSubmit(values);
      console.log(
        "On Submit Example Form Response: ",
        JSON.stringify(values, null, 4)
      );
    },
    onInvalidSubmit: (values) =>
      console.log(
        "On Submit Invalid Example Form Response: ",
        JSON.stringify(values, null, 4)
      ),
  };

  return user ? (
    <ThemeProvider defaultTheme="dark">
      <FormixFormProvider {...schemaFormProps}>
        <FormBody>
          <FormHeader>
            <FormTitle />
            <FormDescription />
          </FormHeader>
          <FormContent>
            <FormFlexFields fluid columns={2} />
          </FormContent>
          <FormFooter>
            <button type="submit" className="mt-5">
              Submit
            </button>
          </FormFooter>
        </FormBody>
      </FormixFormProvider>
    </ThemeProvider>
  ) : null;
}

export default App;
