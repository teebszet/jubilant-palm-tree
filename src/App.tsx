import {
  createBrowserRouter,
  createRoutesFromElements,
  Link,
  Outlet,
  Route,
  RouterProvider,
  useParams,
} from "react-router-dom";
import Home from "./routes/Home";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="detail/:id" element={<Detail />} />
      <Route path="*" element={<NoMatch />} />
    </Route>
  )
);

// TODO move to routes
function Layout() {
  return (
    <div>
      <nav></nav>
      <Outlet />
    </div>
  );
}

function Detail() {
  const { id } = useParams();
  return (
    <div>
      <h2>details here: {id}</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
