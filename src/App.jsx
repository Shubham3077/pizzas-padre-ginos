import { createRoot } from 'react-dom/client'; // named export explicitly ie only import this
import React, { StrictMode, useState } from 'react';
import { RouterProvider, createRouter } from '@tanstack/react-router';
// for multiple exports from a single file we use named export else we use the default one
import {routeTree} from './routeTree.gen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const router = createRouter({ routeTree });
const queryClient = new QueryClient();

const App = () => {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}/>
      </QueryClientProvider>
    </StrictMode>
  )
}

const container = document.getElementById("root");
const root = createRoot(container);
// stamps the instance of the component inside the virtual dom
root.render(React.createElement(App));
