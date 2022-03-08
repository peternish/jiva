import { render, screen } from "@testing-library/react";
import { shallow, configure } from 'enzyme'
import { setCabangList, setKlinik } from "@redux/modules/klinik";
import { Provider } from "react-redux";
import { store } from "@redux/store";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Klinik from "@pages/klinik/index";
import Card from "@components/KlinikPageComponents/CabangCard";
import "@testing-library/jest-dom";

configure({ adapter: new Adapter() });

const component = shallow(
  <Provider store={store}>
    <Klinik />
  </Provider>
);

describe("<Klinik/>", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Klinik />
      </Provider>
    );
  });

  it("renders title correctly", () => {
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  it("has main text above", () => {
    expect(screen.getByText("Cabang Klinik")).toBeInTheDocument();
  })

  it("doesn't show card when doesn't have cabang", () => {
    expect(component.contains(<Card />)).toBe(false);
  })

  it("shows a card when at least have one cabang", async () => {
    await store.dispatch(setCabangList([{ location: "Alam Sutra", id: 1 }]))
    await store.dispatch(setKlinik({ name: "Klinik Lalita" }))

    expect(screen.getByText("Alam Sutra")).toBeInTheDocument()
    expect(screen.getByText("Klinik Lalita")).toBeInTheDocument()
  })

});
