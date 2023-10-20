import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";

export default function PoistaVarausPage() {
    const router = useRouter()
    const {id}=router.query

    function peruuta() {
        console.log(id)
        router.push('/ajanvaraus/muokkaa/'+id)
    }
    async function poistaVaraus(){
        await axios.delete('/api/ajanvaraus?id='+id)
        router.push("/ajanvaraus/")
    }
    return(
        <Layout>
            <h1 className="text-center">Haluatko varmasti poistaa kohteen ""?</h1>
            <div className="flex justify-center gap-4">
                <button className="tallenna" onClick={poistaVaraus}>Kyllä</button>
                <button className="tallenna" onClick={peruuta}>Ei</button>
            </div>
        </Layout>
    )
}