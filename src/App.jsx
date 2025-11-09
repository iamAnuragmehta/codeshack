import { useState, useEffect } from "react";
import Home from "./Pages/Home_Page/Home.jsx";
import LoadingPage from "./Pages/Loading_Page/Loadingpage.jsx";
function App() {
  const [isLoading, setIsLoading] = useState(true);

  // WHEN LOADINGPAGE finishes → it calls setIsLoading(false)
  const handleLoadingFinish = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        // Renders the LoadingPage and waits for it to finish
        <LoadingPage onFinish={handleLoadingFinish} />
      ) : (
        // Renders the Homepage component, which now embeds the AboutPage content
        <Home />
      )}
    </>
  );
}

export default App;
