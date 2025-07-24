import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RoutesPath } from './routes-enum/routes-enum.ts';
import { TablePage } from '../pages/TablePage/TablePage.tsx';

const router = createBrowserRouter([
  {
    path: RoutesPath.HOME,
    element: <Navigate to={RoutesPath.TABLE} />,
  },
  {
    path: RoutesPath.TABLE,
    element: <TablePage />,
  },
]);

export { router };
