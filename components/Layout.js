import NavBar from "@/components/NavBar"
import { useSession, signIn, signOut } from "next-auth/react"

export default function Layout({children}) {
  const { data: session } = useSession()
  if (!session){
    return(
      <div className="bg-themeDark w-screen h-screen flex items-center">
        <div className="text-center w-full flex flex-col items-center">
          <h1 className="text-4xl p-4 text-themeYellow mb-8 border-b-2 border-themePeach ">Psykoutsi Admin</h1>
          <button onClick={()=> signIn('google')} className="bg-themeYellow py-2 px-4 rounded-md color-themeSlate hover:bg-themePeach hover:scale-110 ease-in duration-300">Kirjaudu sisään</button>
        </div>
      </div>
    )
  }
  return (
    <div className="bg-themeDark h-screen flex flex-col">
      <NavBar/>
      <div className="bg-white  flex-grow mt-4 mb-8 mx-8  p-4">
        {children} 
      </div>
   </div>
  )
}