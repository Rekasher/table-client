import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RoutesPath } from './routes-enum/routes-enum.ts';

const router = createBrowserRouter([
  {
    path: RoutesPath.HOME,
    element: <Navigate to={RoutesPath.TABLE} />,
  },
  {
    path: RoutesPath.TABLE,
  },
]);

export { router };
