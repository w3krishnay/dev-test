import AddressList from "./addresses";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Showlog from "@/utils/logger";
import { useState } from "react";

export default function CheckoutForm({
  user,
  logout,
  addressList,
  addAddress,
}: any) {
  const [selected, setSelected] = useState("selected:1");

  const validateRequired = (val: string) => {
    try {
      if (!val) {
        return "Required";
      }
    } catch (error) {
      Showlog("Required Validation error(form.tsx):", error);
    }
  };

  return (
    <div className="md:flex ">
      <div className="w-full">
        <span className="text-sm font-medium text-gray-900">
          Customer Information
        </span>

        <div className="relative pb-5">
          <input
            type="text"
            name="mail"
            className="mt-3 h-9 w-full rounded border px-2 text-xs placeholder:text-zinc-500 focus:border-gray-500 focus:outline-none"
            placeholder="E-mail"
            value={user?.email || ""}
            readOnly
          />
          <span
            className="absolute right-2 top-5 text-xs font-medium text-blue-500 cursor-pointer"
            onClick={logout}
          >
            {user ? "Log out" : "Log in"}
          </span>
          <div className="mt-4 flex items-center">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              className="h-3 w-3 rounded border-gray-300 bg-gray-100 text-xs text-blue-600 placeholder:text-zinc-500 focus:outline-none focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 "
            />
            <label htmlFor="default-checkbox" className="ml-1 text-xs">
              Keep me up to date with news and special offers
            </label>
          </div>
        </div>

        <span className="text-sm font-medium text-gray-900 mb-4 block">
          Shipping Address
        </span>
        <Formik
          initialValues={{
            checkout_address: "selected:1",
            first_name: "",
            last_name: "",
            company: "",
            address1: "",
            address2: "",
            zip: "",
            city: "",
            state: "",
            country: "US",
            phone: "",
          }}
          validate={(values) => {
            setSelected(values.checkout_address);
          }}
          onSubmit={async (values, { resetForm }) => {
            addAddress({
              name: `${values.first_name} ${values.last_name}`,
              address1: values.address1,
              address2: values.address2,
              city: values.city,
              state: values.state,
              zip: values.zip,
              country: "US", // used this static for now
              phone: values.phone,
            });
            resetForm();
          }}
        >
          {() => (
            <Form>
              <AddressList list={addressList.results} />
              <div className="py-4 px-2 flex items-center border-gray-300 border-2 rounded-b">
                <Field
                  type="radio"
                  name="checkout_address"
                  className="h-3 w-3 border-gray-300"
                  value={"selected:0"}
                />
                <label className="ml-4 text-xs">
                  Continue with a new Shipping Address
                </label>
              </div>
              {selected === "selected:0" && (
                <>
                  <div className="grid md:grid-cols-2 md:gap-2">
                    <div>
                      <Field
                        name="first_name"
                        className="mt-3 h-9 w-full rounded border px-2 text-xs placeholder:text-zinc-500 focus:border-gray-500 focus:outline-none"
                        placeholder="First name*"
                        validate={validateRequired}
                      />
                      <ErrorMessage
                        name="first_name"
                        component="div"
                        className="text-xs text-red-600"
                      />
                    </div>
                    <div>
                      <Field
                        name="last_name"
                        className="mt-3 h-9 w-full rounded border px-2 text-xs placeholder:text-zinc-500 focus:border-gray-500 focus:outline-none"
                        placeholder="Last name*"
                        validate={validateRequired}
                      />
                      <ErrorMessage
                        name="last_name"
                        component="div"
                        className="text-xs text-red-600"
                      />
                    </div>
                  </div>
                  <Field
                    name="company"
                    className="mt-3 h-9 w-full rounded border px-2 text-xs placeholder:text-zinc-500 focus:border-gray-500 focus:outline-none"
                    placeholder="Company (optional)"
                  />
                  <Field
                    name="address1"
                    className="mt-3 h-9 w-full rounded border px-2 text-xs placeholder:text-zinc-500 focus:border-gray-500 focus:outline-none"
                    placeholder="Address*"
                    validate={validateRequired}
                  />
                  <ErrorMessage
                    name="address1"
                    component="div"
                    className="text-xs text-red-600"
                  />
                  <Field
                    name="address2"
                    className="mt-3 h-9 w-full rounded border px-2 text-xs placeholder:text-zinc-500 focus:border-gray-500 focus:outline-none"
                    placeholder="Apartment, suite, etc. (optional)"
                  />
                  <div className="grid md:grid-cols-3 md:gap-2">
                    <div>
                      <Field
                        name="zip"
                        className="mt-3 h-9 w-full rounded border px-2 text-xs placeholder:text-zinc-500 focus:border-gray-500 focus:outline-none"
                        placeholder="Zipcode*"
                        validate={validateRequired}
                      />
                      <ErrorMessage
                        name="zip"
                        component="div"
                        className="text-xs text-red-600"
                      />
                    </div>
                    <div>
                      <Field
                        name="city"
                        className="mt-3 h-9 w-full rounded border px-2 text-xs placeholder:text-zinc-500 focus:border-gray-500 focus:outline-none"
                        placeholder="City*"
                        validate={validateRequired}
                      />
                      <ErrorMessage
                        name="city"
                        component="div"
                        className="text-xs text-red-600"
                      />
                    </div>
                    <div>
                      <Field
                        name="state"
                        className="mt-3 h-9 w-full rounded border px-2 text-xs placeholder:text-zinc-500 focus:border-gray-500 focus:outline-none"
                        placeholder="State*"
                        validate={validateRequired}
                      />
                      <ErrorMessage
                        name="state"
                        component="div"
                        className="text-xs text-red-600"
                      />
                    </div>
                  </div>
                  <Field
                    name="country"
                    className="mt-3 h-9 w-full rounded border px-2 text-xs placeholder:text-zinc-500 focus:border-gray-500 focus:outline-none"
                    placeholder="Country*"
                    validate={validateRequired}
                  />
                  <ErrorMessage
                    name="country"
                    component="div"
                    className="text-xs text-red-600"
                  />
                  <Field
                    name="phone"
                    className="mt-3 h-9 w-full rounded border px-2 text-xs placeholder:text-zinc-500 focus:border-gray-500 focus:outline-none"
                    placeholder="Phone Number*"
                    validate={validateRequired}
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-xs text-red-600"
                  />
                </>
              )}
              <div className="flex items-center justify-between pt-2 mt-4">
                <button
                  type="reset"
                  className="h-12 w-24 text-xs font-medium text-blue-500"
                >
                  Return to cart
                </button>{" "}
                <button
                  type="submit"
                  className="h-12 w-48 rounded bg-blue-500 text-xs font-medium text-white"
                >
                  Continue to Shipping
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
