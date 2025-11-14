import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Sidebar from "./components/Sidebar/Sidebar";
import Sandbox from "./components/Sandbox/Sandbox";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen w-screen bg-[#030712] text-gray-200 overflow-hidden">
        <Sidebar />
        <Sandbox />
      </div>
    </DndProvider>
  );
}

export default App;
