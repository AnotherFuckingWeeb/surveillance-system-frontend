import { useState, useEffect } from "react";
import { _loadFontAsync } from "./assets/index";
import { Splash } from "./src/screens/Splash";
import { Welcome } from "./src/screens/Welcome";

export default function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    _loadFontAsync()
      .then(() => {
        setTimeout(() => setLoading(false), 5000);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (loading) {
    return <Splash />;
  }

  return <Welcome />;
}
