
import Sidenav from "@/Components/Sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen p-5">
      <div className="w-1/3 flex-none">
             <Sidenav/>
      </div>
      <div className="flex-grow flex-nowrap ">{children}</div>
    </div>
  );
}