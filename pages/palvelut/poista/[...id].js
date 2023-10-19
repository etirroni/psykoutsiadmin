import Layout from "@/components/Layout";
import { useRouter } from "next/router";

export default function PoistaPalveluPage() {
    const router = useRouter()
    function peruuta() {
        const {id}=router.query
        console.log(id)
        router.push('/palvelut/muokkaa/'+id)
    }
    return(
        <Layout>
            <h1 className="text-center">Haluatko varmasti poistaa kohteen ""?</h1>
            <div className="flex justify-center">
                <button className="tallenna c">Kyllä</button>
                <button className="tallenna" onClick={peruuta}>Ei</button>
            </div>
        </Layout>
    )
}