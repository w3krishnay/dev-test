import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event"
import ForgotPassword from "@/pages/forgotPassword";
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

  describe("Reset Password Tests", () => {
    it("Reset Password page Tests", async () => {
        swell.account.recover.mockResolvedValue({"success":true})
      render(<ForgotPassword />);

      //heading with Reset Password text should exist
      expect(
        screen.getByRole("heading", { name: /reset password/i })
      ).toBeInTheDocument();

      // no error is shown on render
      expect(screen.queryByText(/email required/i)).toBeNull();

      //validate empty fields check on submit click
      userEvent.click(screen.getByRole('button', {  name: /reset now/i}));
      expect(await screen.findByText(/email required/i)).toBeInTheDocument();

      //errors should disappear on input value changes and email is validated
      const emailInput = screen.getByRole('textbox');
      await userEvent.type(emailInput,"Invalid email");
      expect(screen.queryByText(/email required/i)).toBeNull();
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();

      //no email error on valid email input
      await userEvent.clear(emailInput);
      await userEvent.type(emailInput,"hello@devkind.com.au");
      expect(screen.queryByText(/email required/i)).toBeNull();
      expect(screen.queryByText(/invalid email address/i)).toBeNull();

      //click on reset password
      await userEvent.click(screen.getByRole('button', {  name: /reset now/i}));
      expect(swell.account.recover).toBeCalled();
    });
  });
