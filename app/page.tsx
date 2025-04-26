import Image from "next/image";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen max-w-screen">
      <Navbar />
      <div className="max-w-screen-7xl items-center justify-center text-center">
        <h1>russell's ergonomic tracker idea</h1>
      </div>
    </div>
  );
}
