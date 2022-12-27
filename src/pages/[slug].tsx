import { useEffect, useState } from "react";
import type { Cart, Address } from "swell-js";
import swell from "swell-js";

import CheckoutForm from "@/components/form";
import Loader from "@/components/loading";
import OrderSummary from "@/components/order_summary";
import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";
import Router from "next/router";
import Showlog from "@/utils/logger";

const Index = ({ checkout_id }: { checkout_id: string }) => {
  //initialize swell client
  swell.init(
    process.env.NEXT_SWELL_PUBLIC_STORE as string,
    process.env.NEXT_SWELL_PUBLIC_API_TOKEN as string
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [cart, setCart] = useState<Cart | any>(null);
  const [user, setUser] = useState<any>(null);
  const [addressList, setAddressList] = useState<Address | any>([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      // @ts-ignore
      //recover cart
      const getCart = await swell.cart.recover(checkout_id);
      setCart(getCart);
      //get user details
      const account = await swell.account.get();
      if (account) {
        setUser(account);
      } else {
        Router.push("/login");
      }
      //get saved addresses
      const addresses = await swell.account.listAddresses();
      if (addresses) setAddressList(addresses);
      setLoading(false);
    })();
  }, [checkout_id]);

  const logout = async () => {
    try {
      setLoading(true);
      if (user) {
        await swell.account.logout();
      }
      Router.push("/login");
    } catch (error) {
      Showlog("Logout error([slug].tsx)", error);
    }
  };

  const addAddress = async (data: any) => {
    try {
      setLoading(true);
      const res = await swell.account.createAddress(data);
      if (res) {
        const addresses = await swell.account.listAddresses();
        if (addresses) setAddressList(addresses);
      }
      setLoading(false);
    } catch (error) {
      Showlog("Add address error([slug].tsx)", error);
      setLoading(false);
    }
  };

  return (
    <Main
      meta={
        <Meta
          title="Next.js checkout Presentation"
          description="Next js checkout is the perfect starter code for your project. Build your React application with the Next.js framework."
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
        <div className="mx-auto grid min-h-screen grid-cols-12">
          <div className="mx-auto mr-6 col-span-10 col-start-2 py-6 sm:py-12 lg:col-span-5 lg:col-start-2">
            <div className="ml-auto w-full">
              <h1 className="relative text-center text-2xl font-medium text-gray-700 sm:text-3xl">
                Toggly Checkout
              </h1>
              <div className="flex flex-wrap items-center justify-center text-xs">
                <ul className="flex items-center gap-2">
                  <li className="inline-flex items-center">
                    <a href="#" className="text-gray-900 hover:text-gray-900">
                      Customer Information
                    </a>
                    <span className="ml-2 h-auto font-medium text-gray-400">
                      /
                    </span>
                  </li>

                  <li className="inline-flex items-center">
                    <a href="#" className="text-gray-600 hover:text-gray-900">
                      Shipping Method
                    </a>

                    <span className="ml-2 h-auto font-medium text-gray-400">
                      /
                    </span>
                  </li>

                  <li className="inline-flex items-center">
                    <a href="#" className=" text-gray-600 hover:text-gray-900">
                      Payment Method
                    </a>
                  </li>
                </ul>
              </div>

              {user && <CheckoutForm
                user={user}
                logout={logout}
                addressList={addressList}
                addAddress={addAddress}
              />}
            </div>
          </div>
          {cart !== null && <OrderSummary {...cart} />}
        </div>
      </div>
    </Main>
  );
};

export async function getServerSideProps(context: any) {
  return {
    props: {
      checkout_id: context.query.slug,
    },
  };
}

export default Index;
