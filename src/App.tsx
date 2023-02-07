import React from 'react';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Welcome from './pages/Welcome';
import Editor from './pages/Editor';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Welcome/>
  },
  {
    path: "/app",
    element: <Editor/>,
  },
]);

function App() {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = require('./mocks/browser')
    worker.start()
  }
  return (
    <RouterProvider router={router} />
  );
}

export default App;
