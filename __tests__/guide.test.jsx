import { render, screen, } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { store } from "@redux/store";
import Guide from "@pages/guide";

describe("<Guide/>", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Guide />
      </Provider>
    );
  });

  it('renders a heading', () => {
    const heading = screen.getByRole('heading', {
      name: /Petunjuk Penggunaan/,
    });

    expect(heading).toBeInTheDocument();
  });
});
