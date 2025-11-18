import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Sidebar from "./components/Sidebar/Sidebar";
import Sandbox from "./components/Sandbox/Sandbox";
import { useGetAllDevicesQuery } from "./redux/features/device/deviceApi";
import Loader from "./components/Loader/Loader";

function App() {
  const { data: devices, isLoading } = useGetAllDevicesQuery(undefined);
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen w-screen bg-[#030712] text-gray-200 overflow-hidden">
        {
          isLoading ? <Loader/> :
          <>
            <Sidebar devices={devices?.data} />
            <Sandbox />
          </>
        }
      </div>
    </DndProvider>
  );
}

export default App;
