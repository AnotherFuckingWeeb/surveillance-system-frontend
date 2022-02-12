import { Route } from "./src/Route";
import { UserProvider } from "./src/context";

export default function App() {
  return (
    <UserProvider>
      <Route />
    </UserProvider>
  );
}
