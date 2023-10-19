import Layout from "@/components/Layout";
import LomakeAsiakasTiedot from "@/components/LomakeAsiakasTiedot";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function MuokkaaAsiakastaSivu() {
    const [asiakasData, setAsiakasData] = useState(null);
    const router = useRouter();
    const {id} = router.query
    useEffect(()=>{
        if(!id){ console.log("muokkaa asiaksta sivulle päästy")
            "Palvelua ei löytynt id:llä ota yhteys tekniseen tukeen"
        } 
        console.log("muokkaa asiakasta sivulle päästy")
        axios.get('/api/asiakkaat?id='+id).then(response =>{
            console.log("response data saatu", response.data)
            setAsiakasData(response.data)
            console.log("asiakasData asetettu:", asiakasData)
        })
    }, [id])
    return(
        <Layout>
            <h1>Muokkaa asiakasta: "{asiakasData?.nimi}"</h1>
            {asiakasData && (<LomakeAsiakasTiedot {...asiakasData}/>)}
            <Link href={'/asiakkaat/poista/'+asiakasData?._id} className="tallenna inline-flex">Poista "{asiakasData?.nimi}"</Link>
        </Layout>
    )
}