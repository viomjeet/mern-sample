import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routerList from './Routes/RouterList'
const roots = () => {
  let list: any[] = [];
  routerList.forEach(item => {
    let row: any = {};
    row.path = item.path;
    row.element = <item.element />
    list.push(row)
    if (item.children.length > 0) {
      item?.children.forEach((child: any) => {
        let rowc: any = {};
        rowc.path = child.path;
        rowc.element = <child.element />
        list = [...list, rowc];
      })
    }
  })
  return list;
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: roots()
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);