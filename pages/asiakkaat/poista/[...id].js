import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";

export default function PoistaAsiakasSivu(){
    const router = useRouter()
    const {id}=router.query

    function peruuta() {
        console.log(id)
        router.push('/asiakkaat/muokkaa/'+id)
    }
    async function poistaAsiakas(){
        await axios.delete('/api/asiakkaat?id='+id)
        router.push("/asiakkaat/")
    }
    return(
        <Layout>
            <h1 className="text-center">Haluatko varmasti poistaa kohteen ""?</h1>
            <div className="flex justify-center gap-4">
                <button className="tallenna" onClick={poistaAsiakas}>Kyllä</button>
                <button className="tallenna" onClick={peruuta}>Ei</button>
            </div>
        </Layout>
    )

}