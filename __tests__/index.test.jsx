import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "components/Navbar";
import Layout from "@components/Layout";

describe("Layout", () => {
  it("renders a head", () => {
    const text = "Hello";
    render(<Layout>{text}</Layout>);
    expect(screen.getByText(text)).toBeInTheDocument();
  });
});

describe("Navbar", () => {
  it("renders a navbar", () => {
    render(<Navbar />);

    const nav = screen.getByRole("navigation");

    expect(nav).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<Navbar />);

    const links = screen.getAllByRole("link");

    expect(links).toHaveLength(3);
  });
});
