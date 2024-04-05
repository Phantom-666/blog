import NavBar from "./components/Navbar"

export default function Home() {
  return (
    <>
      <NavBar />
      <div
        className="
        h-screen
        flex
        justify-center
        "
      >
        <div>
          <div className="bg-white p-8 rounded max-w-md w-full">
            <h2 className="text-2xl  mb-4">WELCOME</h2>
          </div>
        </div>
      </div>
    </>
  )
}
