import * as nextRouter from 'next/router';

export const mockRouter = (route) => {
  nextRouter.useRouter = jest.fn();
  nextRouter.useRouter.mockImplementation(() => ({
    route: route,
    query: { idCabang: 1 },
    isReady: true,
  }));
}