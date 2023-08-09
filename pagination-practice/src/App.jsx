import { useState } from "react";
import Launches from "./components/Launches";
import Rockets from "./components/Rockets";
import Missions from "./components/Missions";

function App() {
  const [contentType, setContentType] = useState("launches");
  return (
    <>
      <nav className="bg-slate-800">
        <div className=" flex text-white justify-start space-x-5 text-xl p-5">
          <button
            className="hover:bg-gray-700"
            onClick={() => setContentType("rockets")}
          >
            Rockets
          </button>
          <button
            className="hover:bg-gray-700"
            onClick={() => setContentType("missions")}
          >
            Missions
          </button>
          <button
            className="hover:bg-gray-700"
            onClick={() => setContentType("launches")}
          >
            Launches
          </button>
        </div>
      </nav>
      {contentType === "launches" && <Launches />}
      {contentType === "missions" && <Missions />}
      {contentType === "rockets" && <Rockets />}
    </>
  );
}

export default App;
