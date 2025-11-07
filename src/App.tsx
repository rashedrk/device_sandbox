import Sidebar from "./components/Sidebar/Sidebar";
import Sandbox from "./components/Sandbox/Sandbox";

function App() {
  return (
    <div className="flex h-screen w-screen bg-[#030712] text-gray-200 overflow-hidden">
      {/* <Sidebar onDragStart={() => {}} /> */}
      <Sidebar />
      <Sandbox />
    </div>
  );
}

export default App;
