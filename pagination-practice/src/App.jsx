import { useState } from "react";
import Launches from "./components/Launches";
import Rockets from "./components/Rockets";
import StarLink from "./components/StarLink";

function App() {
  const [contentType, setContentType] = useState("launches");
  return (
    <>
      <nav className="bg-slate-800">
        <div className=" flex text-white space-x-5 text-xl p-5">
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
            StarLink
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
      {contentType === "missions" && <StarLink />}
      {contentType === "rockets" && <Rockets />}
    </>
  );
}

export default App;
