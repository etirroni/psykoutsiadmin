import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import LomakeTerapiaTiedot from "@/components/LomakeTerapiaTiedot";
import Link from "next/link";
import LomakeAjanvaraus from "@/components/LomakeAjanvaraus";

export default function MuokkaaPalveluPage() {
    const [varausData, setVarausData] = useState(null);
    const router = useRouter();
    const {id} = router.query
    useEffect(()=>{
        if(!id){ console.log("muokkaa sivulle päästy")
            "Varausta ei löytynt id:llä ota yhteys tekniseen tukeen"
        } 
        console.log("ajanvaraus muokkaa sivulle päästy")
        axios.get('/api/ajanvaraus?id='+id).then(response =>{
            console.log("response data saatu", response.data)
            setVarausData(response.data)
            console.log("varausData asetettu:", varausData)
        })
    }, [id])


    return(
        <Layout>
            <h1>Muokkaa varausta "{varausData?.asiakas + ", " + varausData?.pvm}"</h1>
            {varausData && (<LomakeAjanvaraus {...varausData}/>)}
            <Link href={'/ajanvaraus/poista/'+varausData?._id} className="tallenna inline-flex">Poista "{varausData?.asiakas}"</Link>
        </Layout>
    )
}