import { Field } from "formik";

const AddressList = ({ list }: { list: Array<any> }) => {
  return (
    <>
      {list &&
        list.length > 0 &&
        list.map((address, i) => (
          <div
            className={`py-4 px-2 flex items-center border-gray-300 border-2 ${
              i === 0 ? "rounded-t" : ""
            } border-b-transparent`}
            key={address.id}
          >
            <Field
              type="radio"
              name="checkout_address"
              value={"selected:" + (i + 1)}
              className="h-3 w-3 border-gray-300"
            />
            <label className="ml-4 text-xs">
              {`${address.name || ""}, ${address.address1 || ""} ${address.address2 || ""} ${address.city || ""} ${address.state || ""} ${address.zip || ""} (${address.country || ""})`}
            </label>
          </div>
        ))}
    </>
  );
};

export default AddressList;
