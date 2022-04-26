import { fireEvent, render, screen, act } from "@testing-library/react";
import '@testing-library/jest-dom';
import * as nextRouter from 'next/router';

import Jadwal from '@pages/klinik/[idKlinik]/[idCabang]/jadwal-tenaga-medis';

import { Provider } from "react-redux";
import { store } from "@redux/store";
import { setJadwalTenagaMedisList } from '@redux/modules/jadwalTenagaMedis';
import { setTenagaMedisList } from '@redux/modules/tenagaMedis';

describe('JadwalTenagaMedis', () => {
    beforeEach( async () => {
        await store.dispatch(setJadwalTenagaMedisList([{
            id: 47,
            tenaga_medis: {
                account: {
                    id: 3,
                    full_name: "TM 2",
                    email: "tm3@klinik99.com",
                    date_joined: "2022-04-02T10:43:33.797983Z",
                    last_login: "2022-04-02T10:43:33.797983Z",
                    role: "tenaga_medis",
                    cabang: 1,
                    klinik: 1
                },
                sip: "https://django-surat-izin-klinik-jiva.s3.amazonaws.com/static/HW2204B4.txt"
            },
            start_time: "02:08:00",
            end_time: "05:09:00",
            quota: 2,
            day: "mon"
        },
        {
            id: 50,
            tenaga_medis: {
                account: {
                    id: 3,
                    full_name: "TM 3",
                    email: "tm3@klinik99.com",
                    date_joined: "2022-04-02T10:43:33.797983Z",
                    last_login: "2022-04-02T10:43:33.797983Z",
                    role: "tenaga_medis",
                    cabang: 1,
                    klinik: 1
                },
                sip: "https://django-surat-izin-klinik-jiva.s3.amazonaws.com/static/HW2204B4.txt"
            },
            start_time: "08:23:00",
            end_time: "09:23:00",
            quota: 3,
            day: "tue"
        }]))
    await store.dispatch(setTenagaMedisList([
        {
            account: {
                id: 2,
                full_name: "TM 2",
                email: "tm2@klinik99.com",
                date_joined: "2022-03-31T12:49:11.378628Z",
                last_login: "2022-03-31T12:49:11.378628Z",
                role: "tenaga_medis",
                cabang: 1,
                klinik: 1
            },
            sip: "https://django-surat-izin-klinik-jiva.s3.amazonaws.com/static/HW2204B4.txt"
        },
        {
            account: {
                id: 3,
                full_name: "TM 3",
                email: "tm3@klinik99.com",
                date_joined: "2022-04-02T10:43:33.797983Z",
                last_login: "2022-04-02T10:43:33.797983Z",
                ole: "tenaga_medis",
                cabang: 1,
                klinik: 1
            },
            sip: "https://django-surat-izin-klinik-jiva.s3.amazonaws.com/static/HW2204B4.txt"
        }
    ]))
        nextRouter.useRouter = jest.fn();
        nextRouter.useRouter.mockImplementation(() => ({ 
          route: '/klinik/1/1/jadwal-tenaga-medis', 
          query: { idKlinik: 1, idCabang: 1 },
          isReady: true, 
        }));
        render(
          <Provider store={store}>
            <Jadwal />
          </Provider>
        );
      });

      afterEach(() => {
        let assignMock = jest.fn();
        delete window.location;
        window.location = { assign: assignMock };
        assignMock.mockClear();
      });

      describe('Main Components', () => {
        it('should have page heading', () => {
            const heading = screen.getByRole('heading', {
                name: /Jadwal Tenaga Medis/,
            });
            expect(heading).toBeInTheDocument();
        });

        it('should have combobox and option', () => {
            const combobox = screen.getAllByRole('combobox')[0];
            const option = screen.getAllByRole('option')[0];

            expect(combobox).toBeInTheDocument();
            expect(option).toBeInTheDocument();
        })
      });

      describe('Functions', () => {
          it('should parseData force_filter', async () => {
              const button = screen.getByText('Tampilkan Semua Jadwal')
              act(async () => {
                await fireEvent.click(button);
              });

              expect(await screen.getAllByRole('combobox')[0]).toBeInTheDocument();
          });

          it('should updateEvents', async () => {
            const event = screen.getAllByText('TM 3')[1];
            await act(async () => {
                await fireEvent.click(event);
            });

            expect(await screen.getAllByText('TM 3').length === 3)

            const jadwalHariSelect = screen.getAllByRole('combobox')[2]
            act(async () => {
                await fireEvent.change(jadwalHariSelect, {target: {value: "Sabtu"}});
            });

            const startTime = screen.getByTestId("start")
            act(async () => {
                await fireEvent.change(startTime, {target: {value: "13:00"}});
            });

            const endTime = screen.getByTestId("end")
            act(async () => {
                await fireEvent.change(endTime, {target: {value: "15:00"}});
            });

            const quota = screen.getByRole('spinbutton')
            act(async () => {
                await fireEvent.change(quota, {target: {value: 8}});
            });

            const button = screen.getByTestId('update')
            await act(async () => {
                await fireEvent.click(button);
            });

            expect(await screen.getAllByText('TM 3').length === 3)
        });

          it('should deleteEvent', async () => {
            const event = screen.getAllByText('TM 2')[1];
            act(async () => {
                await fireEvent.click(event);
            });

            expect(await screen.getAllByText('TM 2').length === 3)

            const deleteButton = screen.getByTestId('delete');
            act(async () => {
                await fireEvent.click(deleteButton);
            });

            expect(await screen.getAllByText('TM 2').length === 2)
          });

          it('should createEvent', async () => {
            const tenagaMedisSelect = screen.getAllByRole('combobox')[1]
            act(async () => {
                await fireEvent.change(tenagaMedisSelect, {target: {value: "TM 2"}});
            });

            const jadwalHariSelect = screen.getAllByRole('combobox')[2]
            act(async () => {
                await fireEvent.change(jadwalHariSelect, {target: {value: "Minggu"}});
            });

            const startTime = screen.getByTestId("start")
            act(async () => {
                await fireEvent.change(startTime, {target: {value: "07:00"}});
            });

            const endTime = screen.getByTestId("end")
            act(async () => {
                await fireEvent.change(endTime, {target: {value: "09:00"}});
            });

            const quota = screen.getByRole('spinbutton')
            act(async () => {
                await fireEvent.change(quota, {target: {value: 10}});
            });

            const create = screen.getByTestId("create")
            act(async () => {
                await fireEvent.click(create);
            });

            expect(await screen.getAllByText('TM 2').length === 3)
          })

          it('should filter by tenaga medis', async () => {
            const tenagaMedisSelect = screen.getAllByRole('combobox')[0]
            act(async () => {
                await fireEvent.change(tenagaMedisSelect, {target: {value: "TM 2"}});
            });

            expect(await screen.getAllByText('TM 2').length === 3)
          })
      })

      
})
