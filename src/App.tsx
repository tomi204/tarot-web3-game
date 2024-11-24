import { useState } from "react";
import { TarotReading } from "./components/TarotReading";
import StartScreen from "./components/StartScreen";
import Header from "./components/Header";

function App() {
  const [hasStarted, setHasStarted] = useState(false);

  return (
    <>
    <Header />
      {hasStarted ? (
        <TarotReading />
      ) : (
        <StartScreen onStart={() => setHasStarted(true)} />
      )}
    </>
  );
}
export default App;
