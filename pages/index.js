import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import ViikkoKalenteri from "@/components/ViikkoKalenteri";

export default function Home() {
  const {data: session}=useSession();

  return(
  <Layout>
    <h1>Tervetuloa takaisin {session?.user?.name}!</h1>
      <div>
        <ViikkoKalenteri/>
      </div>
  </Layout>
  ) 
}
