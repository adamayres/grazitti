import IconSearch from "./IconSearch.jsx";
import { useEffect } from "react";
import BannerSearch from "./BannerSearch.jsx";

function App() {
  useEffect(() => {
    document.getElementById("gz-app-root").dataset.loaded = "true";

    return () => {
      document.getElementById("gz-app-root").dataset.loaded = null;
    };
  });

  return (
    <>
      <IconSearch />
      <BannerSearch />
    </>
  );
}

export default App;
