import Sidebar from "../components/Sidebar";

function Main({ children }) {
  return (
    <main className="lg:flex w-screen bg-slate-100">
      <Sidebar />
      <div className="w-full mt-0 text-start p-[2%] overflow-auto">
        {children}
      </div>
    </main>
  );
}

export default Main;
