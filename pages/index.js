import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";

export default function Home() {
  const {data: session}=useSession();
  return(
  <Layout>
    <h1 className="text-xl text-center"> Tervetuloa takaisin {session?.user?.name}! </h1>
    <div className="grid grid-rows-1 grid-flow-col  justify-evenly mt-10">
      <div className="bg-themeDark text-themeYellow p-4 rounded-md">
        <h2>Tuoreimmat yhteenvedot:</h2>
      </div>
      <div className="bg-themeDark text-themeYellow p-4 rounded-md">
        <h2>Uudet asiakkaat:</h2>
      </div>
      <div className="bg-themeDark text-themeYellow p-4 rounded-md">
        <h2>Lisätyt palvelut:</h2>
      </div>
    </div>
    
  </Layout>
  ) 
}
