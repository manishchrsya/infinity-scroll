import { useEffect, useRef, useState } from "react";
import "./App.css";
import { ProgressBar } from "./components";

const totalms = 10 * 1000;
const interval = 1 * 1000;

const totalCycle = totalms / interval;

function App() {
  const [progress, setProgreṣ] = useState(0);
  const timer: any = useRef(0);
  const cyclesCompleted = useRef(0);
  const progressMade = (interval / totalms) * 100;

  useEffect(() => {
    timer.current = setInterval(() => {
      // setProgreṣ(prev => )
      cyclesCompleted.current += 1;
      setProgreṣ((prev) => prev + progressMade);
      if (cyclesCompleted.current === totalCycle) {
        clearInterval(timer.current);
      }
    }, 1000);
    return () => {
      clearInterval(timer.current);
    };
  }, []);

  return (
    <div>
      <ProgressBar progress={progress} />
    </div>
  );
}

export default App;
