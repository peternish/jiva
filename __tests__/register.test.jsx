import { render, screen } from "@testing-library/react";
import Register from "@pages/register";
import "@testing-library/jest-dom";

describe("Register", () => {
  it("renders register form", () => {
    render(<Register />);
    expect(screen.getByText("Daftar Pemilik Klinik")).toBeInTheDocument();

    // Labels
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Nama Lengkap")).toBeInTheDocument();

    // Input
    expect(screen.getByPlaceholderText("jiva@gmail.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("John Doe")).toBeInTheDocument();
  });
});
