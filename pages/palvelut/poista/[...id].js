import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";

export default function PoistaPalveluPage() {
    const router = useRouter()
    const {id}=router.query

    function peruuta() {
        console.log(id)
        router.push('/palvelut/muokkaa/'+id)
    }
    async function poistaTerapia(){
        await axios.delete('/api/palvelut?id='+id)
        router.push("/palvelut/")
    }
    return(
        <Layout>
            <h1 className="text-center">Haluatko varmasti poistaa kohteen ""?</h1>
            <div className="flex justify-center gap-4">
                <button className="tallenna" onClick={poistaTerapia}>Kyllä</button>
                <button className="tallenna" onClick={peruuta}>Ei</button>
            </div>
        </Layout>
    )
}