import { render, screen } from '@testing-library/react'
import Tambah from '@pages/pengaturan-pengguna/tambah'
import '@testing-library/jest-dom'

describe("Pengaturan Pengguna Tambah", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Tambah/>
      </Provider>
    );
  });

  it('renders a heading', () => {

    const heading = screen.getAllByRole('heading', {
      name: /Tambah Staf/,
    })[0]

    expect(heading).toBeInTheDocument()
  })

  it('renders data fields', () => {
    const emailField = screen.getByLabelText("Email");
    const passwordField = screen.getByLabelText("Password");
    const inputValueField = screen.getByLabelText("Input Value");

    expect(emailField ).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(inputValueField).toBeInTheDocument();
  });

  it('renders a button', () => {

    const buttonback = screen.getAllByRole('button', {
      name: /Batal/,
    })[0]
    const buttonsubmit = screen.getAllByRole('button', {
      name: /Simpan/,
    })[0]

    expect(buttonback).toBeInTheDocument()
    expect(buttonsubmit).toBeInTheDocument()
  })

  it("renders form validation errors", async () => {
    const button = screen.getAllByRole('button', {
      name: /Simpan/,
    })[0]

    await act(async () => {
      await fireEvent.click(button);
    });

    expect(await screen.getAllByText("Input ini wajib diisi")).toHaveLength(3);
  });

  it("should submit when 'Tambah' is pressed", async () => {
    const emailField = screen.getByLabelText("Email");
    const passwordField = screen.getByLabelText("Password");
    const inputValueField = screen.getByLabelText("Input Value");

    const button = screen.getAllByRole('button', {
      name: /Simpan/,
    })[0]

    await act(async () => {
      await fireEvent.change(emailField, {target: {value: 'hesotam@maile.com'}});
      await fireEvent.change(passwordField, {target: {value: 'password123'}});
      await fireEvent.change(inputValueField, {target: {value: 'Admin'}});

      await fireEvent.click(button);
    });

    expect(await screen.getByLabelText("Email")).toHaveValue('hesotam@maile.com');
    expect(await screen.getByLabelText("Password")).toHaveValue('password123');
    expect(await screen.getByLabelText("Input Value")).toHaveValue('Admin');
  });
});
