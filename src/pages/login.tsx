import React, { useState } from "react";
import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";
import Loader from "@/components/loading";
import str from "@/utils/string";
import { Formik, ErrorMessage, Field } from "formik";
import Showlog from "@/utils/logger";
import swell from "swell-js";
import Router from "next/router";

const Login:React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  swell.init(
    process.env.NEXT_SWELL_PUBLIC_STORE as string,
    process.env.NEXT_SWELL_PUBLIC_API_TOKEN as string
  );

  const validateEmail = (email: string) => {
    try {
      if (!email) {
        return "Required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
        return "Invalid email address";
      }
    } catch (error) {
      Showlog("Email Validation error(login.tsx):", error);
    }
  };

  const validatePassword = (password: string) => {
    try {
      if (!password) {
        return "Required";
      }
    } catch (error) {
      Showlog("Password Validation error(login.tsx):", error);
    }
  };

  async function login(values: any, { setSubmitting }: any) {
    try {
      setLoading(true);
      const res = await swell.account.login(
        values.email.trim(),
        values.password
      );
      if (res) {
        const cart = await swell.cart.get();
        if (cart) {
          // @ts-ignore
          Router.push(`/${cart?.checkout_id}`);
        }
      }
      setSubmitting(false);
      setLoading(false);
    } catch (error) {
      Showlog("Login error(login.tsx):", error);
      setLoading(false);
    }
  }

  return (
    <Main
      meta={
        <Meta
          title="Next.js Checkout"
          description="Donec rutrum congue leo eget malesuada. Vivamus suscipit tortor eget felis porttitor volutpat. Proin eget tortor risus. Nulla porttitor accumsan tincidunt."
        />
      }
    >
      {loading && (
        <div
          id="loading-screen"
          className="fixed top-0 left-0 z-50 block  h-full w-full bg-white"
        >
          <span className="relative top-1/2 my-0 mx-auto block h-0 w-0  opacity-75">
            <Loader />
          </span>
        </div>
      )}
      <div className="relative bg-white">
        <div className="flex items-center justify-center min-h-screen">
          <div className="p-4 items-center border-2 border-gray-400 rounded-md w-[350px] lg:w-[500px]">
            <h1 className="relative text-center text-2xl font-medium text-black sm:text-3xl mb-4">
              {str.login}
            </h1>
            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={(values, { setSubmitting }) => {
                login(values, { setSubmitting });
              }}
            >
              {({ handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                  <label htmlFor="email">Email Address</label>
                  <Field
                    type="email"
                    name="email"
                    autoComplete="off"
                    className=" h-12 w-full rounded border px-2 text-sm focus:border-gray-500 focus:outline-none my-2"
                    validate={validateEmail}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-xs text-red-600"
                  />
                  <label htmlFor="email">Password</label>
                  <Field
                    type="password"
                    name="password"
                    autoComplete="off"
                    className=" h-12 w-full rounded border px-2 text-sm focus:border-gray-500 focus:outline-none my-2"
                    validate={validatePassword}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-xs text-red-600"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className=" rounded bg-zinc-700 px-5 py-2 text-sm font-medium text-white hover:bg-zinc-800 focus:outline-none focus:ring-4 focus:ring-zinc-300 dark:bg-zinc-600 dark:hover:bg-zinc-700 dark:focus:ring-zinc-900 my-2"
                  >
                    Submit
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Login;
