import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event"
import Login from "@/pages/login";
import swell from "swell-js";

jest.mock("swell-js")
jest.mock('next/router', ()=> ({
  push: jest.fn(),
  useRouter: ()=>{
    return {
    push: jest.fn(),
    basePath:"."
  }}
}))

  describe("Login Page Tests", () => {
    it("Login page Tests", async () => {
      swell.account.login.mockResolvedValue({"type":"individual","shipping":{"account_address_id":"63a55017180d150012236dd8","name":"Marry Jane","first_name":"Marry","last_name":"Jane","address1":"5 Nicholson St","address2":null,"city":"Brunswick","state":"VIC","zip":"3131","country":"AU"},"order_value":37.5,"order_count":1,"name":"dev test","last_name":"test","first_name":"dev","email_optin":false,"email":"hello@devkind.com.au","date_last_order":"2022-12-23T09:58:20.313Z","date_first_order":"2022-12-23T09:58:20.313Z","date_created":"2022-12-23T06:51:01.365Z","billing":{"account_card_id":"63a57bb978526200121f35bf","card":{"brand":"Visa","last4":"4242","exp_month":12,"exp_year":2031,"token":"card_d9HVcNoRHO9UAEChcegOGntM","address_check":"pass","zip_check":"pass","cvc_check":"pass"},"name":"john doe","first_name":"john","last_name":"doe","address1":"1 Brushbox Street","address2":null,"city":"Sydney Olympic Park","state":"NSW","zip":"2127","country":"AU","company":"www.google.com"},"balance":0,"id":"63a54fd5180d150012236dd3"})
      swell.cart.get.mockResolvedValue({"taxes":null,"tax_total":0,"tax_included_total":0,"sub_total":4.95,"shipping":{"account_address_id":null},"shipment_total":0,"shipment_price":0,"shipment_discount":0,"shipment_delivery":true,"recovered":true,"promotion_ids":[],"items":[{"tax_total":0,"tax_each":0,"shipment_weight":0,"quantity":1,"purchase_option":{"type":"standard","price":4.95},"product_id":"5e31e67be53f9a59d89600f1","price_total":4.95,"price":4.95,"orig_price":4.95,"options":[],"id":"63a68a2b132a28001223fc4c","discount_total":0,"discount_each":0,"variant":null,"product":{"stock_tracking":true,"stock_purchasable":true,"stock_level":-1,"slug":"aero-press-paper-filters-350-pack","sku":"AERO-FLT-350","sale":false,"price":4.95,"options":[],"name":"AeroPress Paper Filters (350 pack)","images":[{"file":{"id":"6332f20eda40390012b8552d","date_uploaded":"2022-09-27T12:52:30.516Z","length":57400,"md5":"3a1254eb27ce4435ced12c3f72ac58c4","filename":"c29a6e7c2fddde366149ccf829985e27","content_type":"image/jpeg","metadata":null,"url":"https://cdn.schema.io/toggly/6332f20eda40390012b8552d/3a1254eb27ce4435ced12c3f72ac58c4/c29a6e7c2fddde366149ccf829985e27","uploaded_url":"https://cdn.schema.io/test-theme/5f6fd3521abceb3936ee2418/c29a6e7c2fddde366149ccf829985e27","width":1500,"height":1042},"id":"5e31eab3db8c386823a75eeb"}],"description":"<p>These paper AeroPress Micro Filters help you brew coffee with a smooth flavour and clean body by preventing micro grounds from entering your cup. Paper Micro Filters make cleaning up a breeze after brewing a mug of Aeropress coffee. Simply press the plunger until the filter and used grounds are forced into the garbage.<br><br>This pack comes with 350 single-use filters of 6.4cm diameter and are designed to be used with the Aeropress or other brewers that use circular filters.<br><br><br></p>","content":{},"attributes":{"brand":"Aerobie"},"id":"5e31e67be53f9a59d89600f1"}}],"item_tax":0,"item_shipment_weight":0,"item_quantity":1,"item_discount":0,"guest":false,"grand_total":4.95,"giftcard_total":0,"display_locale":"en-AU","display_currency":null,"discounts":[],"discount_total":0,"date_created":"2022-12-24T05:12:10.951Z","date_abandoned":"2022-12-27T16:15:54.503Z","currency":"USD","checkout_url":"https://toggly.swell.store/checkout/98bbb554b8731505d2a87a196de49a95","checkout_id":"98bbb554b8731505d2a87a196de49a95","capture_total":4.95,"billing":{"account_card_id":null},"auth_total":0,"account_logged_in":true,"account_id":"63a54fd5180d150012236dd3","abandoned":true,"id":"63a68a2a132a28001223fc4b","coupon":null,"promotions":{"count":0,"results":[],"page":1},"account":{"type":"individual","shipping":{"account_address_id":"63a55017180d150012236dd8","name":"Marry Jane","first_name":"Marry","last_name":"Jane","address1":"5 Nicholson St","address2":null,"city":"Brunswick","state":"VIC","zip":"3131","country":"AU"},"order_value":37.5,"order_count":1,"name":"dev test","last_name":"test","first_name":"dev","email_optin":false,"email":"hello@devkind.com.au","date_last_order":"2022-12-23T09:58:20.313Z","date_first_order":"2022-12-23T09:58:20.313Z","date_created":"2022-12-23T06:51:01.365Z","billing":{"account_card_id":"63a57bb978526200121f35bf","card":{"brand":"Visa","last4":"4242","exp_month":12,"exp_year":2031,"token":"card_d9HVcNoRHO9UAEChcegOGntM","address_check":"pass","zip_check":"pass","cvc_check":"pass"},"name":"john doe","first_name":"john","last_name":"doe","address1":"1 Brushbox Street","address2":null,"city":"Sydney Olympic Park","state":"NSW","zip":"2127","country":"AU","company":"www.google.com"},"balance":0,"id":"63a54fd5180d150012236dd3","addresses":{"count":4,"results":[{"parent_id":"63a54fd5180d150012236dd3","name":"john doe","address1":"1 Brushbox Street","address2":null,"city":"Sydney Olympic Park","state":"NSW","zip":"2127","country":"AU","active":true,"first_name":"john","last_name":"doe","fingerprint":"5bd966ddfb471bcf8d3faaf789e7881b","date_created":"2022-12-23T06:51:31.383Z","id":"63a54ff39a51900012be1da1"},{"parent_id":"63a54fd5180d150012236dd3","name":"Marry Jane","address1":"5 Nicholson St","address2":null,"city":"Brunswick","state":"VIC","zip":"3131","country":"AU","active":true,"first_name":"Marry","last_name":"Jane","fingerprint":"b482fc1aa3ec1ccc502c28c647783ebf","date_created":"2022-12-23T06:52:07.770Z","id":"63a55017180d150012236dd8"},{"parent_id":"63a54fd5180d150012236dd3","name":"Jacob Smith","address1":"99 Weston St","address2":null,"city":"Carlton","state":"VIC","zip":"3004","country":"AU","active":true,"first_name":"Jacob","last_name":"Smith","fingerprint":"d2346aeba3b60455e70d482484523bd0","date_created":"2022-12-23T06:53:04.999Z","id":"63a5505078526200121f3553"},{"parent_id":"63a54fd5180d150012236dd3","name":"krishna yadav","address1":"s22","address2":"plot 200 vasundhara 2a","city":"ghaziabaad","state":"Uttar Pradesh","zip":"201012","country":"US","phone":"9344022062","active":true,"first_name":"krishna","last_name":"yadav","fingerprint":"397c8a387e649ee9c3f1f3ca058c0a27","date_created":"2022-12-25T17:39:04.910Z","id":"63a88ab8ac151c00128cb4fc"}],"page":1},"cards":{"count":1,"results":[{"parent_id":"63a54fd5180d150012236dd3","billing":{"name":"john doe","first_name":"john","last_name":"doe","address1":"1 Brushbox Street","address2":null,"city":"Sydney Olympic Park","state":"NSW","zip":"2127","country":"AU","company":"www.google.com"},"brand":"Visa","last4":"4242","exp_month":12,"exp_year":2031,"token":"card_d9HVcNoRHO9UAEChcegOGntM","address_check":"pass","zip_check":"pass","cvc_check":"pass","fingerprint":"a7119e0e5f7c928988848353106e3ec2","date_created":"2022-12-23T09:58:17.948Z","active":true,"id":"63a57bb978526200121f35bf"}],"page":1}}});
      render(<Login />);

      //heading with login text should exist
      expect(
        screen.getByRole("heading", { name: /login/i })
      ).toBeInTheDocument();

      // no error is shown on render
      expect(screen.queryByText(/email required/i)).toBeNull();

      //validate empty fields check on submit click
      userEvent.click(screen.getByRole("button", { name: /submit/i }));
      expect(await screen.findByText(/email required/i)).toBeInTheDocument();
      expect(screen.getByText(/password required/i)).toBeInTheDocument();

      //errors should disappear on input value changes and email is validated
      const emailInput = screen.getByRole('textbox');
      const passwordInput = screen.getByPlaceholderText(/password/i);
      await userEvent.type(emailInput,"Invalid email");
      await userEvent.type(passwordInput,"test123");
      expect(screen.queryByText(/email required/i)).toBeNull();
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();

      //no email error on valid email input
      await userEvent.clear(emailInput);
      await userEvent.type(emailInput,"hello@devkind.com.au");
      expect(screen.queryByText(/email required/i)).toBeNull();
      expect(screen.queryByText(/invalid email address/i)).toBeNull();

      //click on login
      await userEvent.click(screen.getByRole("button", { name: /submit/i }));
      expect(swell.account.login).toBeCalled();
      expect(swell.cart.get).toBeCalled();
    });
  });
