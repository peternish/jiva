import { fireEvent, render, screen, act } from "@testing-library/react";
import '@testing-library/jest-dom';
import * as nextRouter from 'next/router';

import Jadwal from '@pages/klinik/[idKlinik]/[idCabang]/jadwal-pasien';

import { Provider } from "react-redux";
import { store } from "@redux/store";
import { setJadwalTenagaMedisList } from '@redux/modules/jadwalTenagaMedis';
import { setTenagaMedisList } from '@redux/modules/tenagaMedis';
import { setJadwalPasien } from '@redux/modules/jadwalPasien';

function des_main_func() {
    describe('Functions', () => {
        it('should parseData force_filter', async () => {
            const button = screen.getByText('Tampilkan Semua Tenaga Medis')
            act(async () => {
              await fireEvent.click(button);
            });

            expect(await screen.getAllByRole('combobox')[0]).toBeInTheDocument();
        });


        it('should filter by tenaga medis', async () => {
          const tenagaMedisSelect = screen.getAllByRole('combobox')[0]
          act(async () => {
              await fireEvent.change(tenagaMedisSelect, {target: {value: "TM 3"}});
          });

          expect(await screen.getAllByText('TM 3').length === 2)
        });

        it('should have combobox and option', () => {
            const combobox = screen.getAllByRole('combobox')[0];
            const option = screen.getAllByRole('option')[0];

            expect(combobox).toBeInTheDocument();
            expect(option).toBeInTheDocument();
        })
    })
}

function startRender(route) {
    nextRouter.useRouter = jest.fn();
    nextRouter.useRouter.mockImplementation(() => ({ 
    route: route, 
    query: { idKlinik: 1, idCabang: 1 },
    isReady: true, 
    }));
    render(
        <Provider store={store}>
            <Jadwal />
        </Provider>
    );
}

describe('JadwalPasien', () => {
    beforeEach( async () => {
        await store.dispatch(setJadwalTenagaMedisList([{
            id: 1,
            tenaga_medis: {
                account: {
                    id: 2,
                    full_name: "TM 3",
                    email: "tm3@klinik99.com",
                    date_joined: "2022-04-25T08:42:23.413118Z",
                    last_login: "2022-04-25T08:42:23.413118Z",
                    role: "tenaga_medis",
                    cabang: 1,
                    klinik: 1
                },
                sip: "https://django-surat-izin-klinik-jiva.s3.amazonaws.com/static/HW2204B4.txt"
            },
            start_time: "18:46:00",
            end_time: "19:46:00",
            quota: 4,
            day: "mon"
        },
        {
            id: 4,
            tenaga_medis: {
                account: {
                    id: 2,
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
            start_time: "15:50:00",
            end_time: "16:50:00",
            quota: 4,
            day: "wed"
        },
        {
            id: 2,
            tenaga_medis: {
                account: {
                    id: 3,
                    full_name: "TM 4",
                    email: "tm4@klinik99.com",
                    date_joined: "2022-04-25T08:42:34.655857Z",
                    last_login: "2022-04-25T08:42:34.655857Z",
                    role: "tenaga_medis",
                    cabang: 1,
                    klinik: 1
                },
                sip: "https://django-surat-izin-klinik-jiva.s3.amazonaws.com/static/HW2204B4.txt"
            },
            start_time: "16:46:00",
            end_time: "17:46:00",
            quota: 5,
            day: "tue"
        },
        {
            id: 3,
            "tenaga_medis": {
                account: {
                    id: 3,
                    full_name: "TM 4",
                    email: "tm4@klinik99.com",
                    date_joined: "2022-04-25T08:42:34.655857Z",
                    last_login: "2022-04-25T08:42:34.655857Z",
                    role: "tenaga_medis",
                    cabang: 1,
                    klinik: 1
                },
                sip: "https://django-surat-izin-klinik-jiva.s3.amazonaws.com/static/HW2204B4.txt"
            },
            start_time: "07:46:00",
            end_time: "08:46:00",
            quota: 9,
            day: "tue"
        }
    ]))
        await store.dispatch(setTenagaMedisList([
        {
            account: {
                id: 2,
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
        {
            account: {
                id: 3,
                full_name: "TM 4",
                email: "tm4@klinik99.com",
                date_joined: "2022-04-25T08:42:34.655857Z",
                last_login: "2022-04-25T08:42:34.655857Z",
                role: "tenaga_medis",
                cabang: 1,
                klinik: 1
            },
            sip: "https://django-surat-izin-klinik-jiva.s3.amazonaws.com/static/HW2204B4.txt"
        }
    ]))
        await store.dispatch(setJadwalPasien([
        {
            id: 3,
            date: "2022-04-05",
            jadwalTenagaMedis: {
                id: 1,
                tenaga_medis: {
                    account: {
                        id: 2,
                        full_name: "TM 3",
                        email: "tm3@klinik99.com",
                        date_joined: "2022-04-25T08:42:23.413118Z",
                        last_login: "2022-04-25T08:42:23.413118Z",
                        role: "tenaga_medis",
                        cabang: 1,
                        klinik: 1
                    },
                    sip: "https://django-surat-izin-klinik-jiva.s3.amazonaws.com/static/HW2204B4.txt"
                },
                start_time: "18:46:00",
                end_time: "19:46:00",
                quota: 4,
                day: "mon"
            },
            lamaranPasien: {
                id: 3,
                nik: "4",
                email: "parapencarikelulusan@gmail.com",
                fields: [
                    [
                        {
                            nama: "Abdullah"
                        }
                    ]
                ]
            }
        },
        {
            id: 5,
            date: "2022-04-25",
            jadwalTenagaMedis: {
                id: 1,
                tenaga_medis: {
                    account: {
                        id: 2,
                        full_name: "TM 3",
                        email: "tm3@klinik99.com",
                        date_joined: "2022-04-25T08:42:23.413118Z",
                        last_login: "2022-04-25T08:42:23.413118Z",
                        role: "tenaga_medis",
                        cabang: 1,
                        klinik: 1
                    },
                    sip: "https://django-surat-izin-klinik-jiva.s3.amazonaws.com/static/HW2204B4.txt"
                },
                start_time: "18:46:00",
                end_time: "19:46:00",
                quota: 4,
                day: "mon"
            },
            lamaranPasien: {
                id: 5,
                nik: "6",
                email: "parapencarikelulusan@gmail.com",
                fields: [
                    [
                        {
                            nama: "Oren"
                        }
                    ]
                ]
            }
        },
        {
            id: 6,
            date: "2022-04-25",
            jadwalTenagaMedis: {
                id: 1,
                tenaga_medis: {
                    account: {
                        id: 2,
                        full_name: "TM 3",
                        email: "tm3@klinik99.com",
                        date_joined: "2022-04-25T08:42:23.413118Z",
                        last_login: "2022-04-25T08:42:23.413118Z",
                        role: "tenaga_medis",
                        cabang: 1,
                        klinik: 1
                    },
                    sip: "https://django-surat-izin-klinik-jiva.s3.amazonaws.com/static/HW2204B4.txt"
                },
                start_time: "18:46:00",
                end_time: "19:46:00",
                quota: 4,
                day: "mon"
            },
            lamaranPasien: {
                id: 6,
                nik: "7",
                email: "parapencarikelulusan@gmail.com",
                fields: [
                    [
                        {
                            nama: "Cimo"
                        }
                    ]
                ]
            }
        },
        {
            id: 7,
            date: "2022-04-25",
            jadwalTenagaMedis: {
                id: 1,
                tenaga_medis: {
                    account: {
                        id: 2,
                        full_name: "TM 3",
                        email: "tm3@klinik99.com",
                        date_joined: "2022-04-25T08:42:23.413118Z",
                        last_login: "2022-04-25T08:42:23.413118Z",
                        role: "tenaga_medis",
                        cabang: 1,
                        klinik: 1
                    },
                    sip: "https://django-surat-izin-klinik-jiva.s3.amazonaws.com/static/HW2204B4.txt"
                },
                start_time: "18:46:00",
                end_time: "19:46:00",
                quota: 4,
                day: "mon"
            },
            lamaranPasien: {
                id: 7,
                nik: "8",
                email: "parapencarikelulusan@gmail.com",
                fields: [
                    [
                        {
                            nama: "Cibu"
                        }
                    ]
                ]
            }
        },
        {
            id: 4,
            date: "2022-04-06",
            jadwalTenagaMedis: {
                id: 2,
                tenaga_medis: {
                    account: {
                        id: 3,
                        full_name: "TM 4",
                        email: "tm4@klinik99.com",
                        date_joined: "2022-04-25T08:42:34.655857Z",
                        last_login: "2022-04-25T08:42:34.655857Z",
                        role: "tenaga_medis",
                        cabang: 1,
                        klinik: 1
                    },
                    sip: "https://django-surat-izin-klinik-jiva.s3.amazonaws.com/static/HW2204B4.txt"
                },
                start_time: "16:46:00",
                end_time: "17:46:00",
                quota: 5,
                day: "tue"
            },
            lamaranPasien: {
                id: 4,
                nik: "5",
                email: "parapencarikelulusan@gmail.com",
                fields: [
                    [
                        {
                            nama: "Ikua"
                        }
                    ]
                ]
            }
        }
    ]))
        startRender('/klinik/1/1/jadwal-pasien')
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
                name: /Jadwal Pasien Minggu Ini/,
            });
            expect(heading).toBeInTheDocument();
        });
      });

      des_main_func()

      describe('Specific Functions', () => {
        it('should select event', () => {
            const event = screen.getAllByText('TM 3')[0];
            act(async () => {
                await fireEvent.click(event);
            });
            
            expect(screen.getByTestId('DaftarPasien')).toBeInTheDocument()
          })
      })
})