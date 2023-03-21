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
      <Route path="details/:id" element={<Detail />} />
      <Route path="*" element={<NoMatch />} />
    </Route>
  )
);

// TODO move to routes
function Layout() {
  return <Outlet />;
}

function Detail() {
  const { id } = useParams();
  console.log(id);
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
