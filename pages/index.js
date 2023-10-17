import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";

export default function Home() {
  const {data: session}=useSession();
  return(
  <Layout>
    <h1 className="text-xl text-center"> Tervetuloa takaisin {session?.user?.name}!  Tässä viimeisimmät tapahtumat: </h1>
    <div className="flex flex-row justify-between p-4 mt-6 mx-10 text-start">
      <div className="bg-themeDark text-themeYellow p-4 rounded-md">Viimeisimmät yhteenvedot</div>
      <div className="bg-themeDark text-themeYellow p-4 rounded-md">Uudet asiakkaat</div>
      <div className="bg-themeDark text-themeYellow p-4 rounded-md">Lisätyt palvelut</div>
    </div>
    
  </Layout>
  ) 
}
