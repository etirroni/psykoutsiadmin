import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import LomakeTerapiaTiedot from "@/components/LomakeTerapiaTiedot";
import Link from "next/link";

export default function MuokkaaPalveluPage() {
    const [palveluData, setPalveluData] = useState(null);
    const router = useRouter();
    const {id} = router.query
    useEffect(()=>{
        if(!id){ console.log("muokkaa sivulle päästy")
            "Palvelua ei löytynt id:llä ota yhteys tekniseen tukeen"
        } 
        console.log("muokkaa sivulle päästy")
        axios.get('/api/palvelut?id='+id).then(response =>{
            console.log("response data saatu", response.data)
            setPalveluData(response.data)
            console.log("palveluData asetettu:", palveluData)
        })
    }, [id])


    return(
        <Layout>
            <h1>Muokkaa palvelua "{palveluData?.terapia}"</h1>
            {palveluData && (<LomakeTerapiaTiedot {...palveluData}/>)}
            <Link href={'/palvelut/poista/'+palveluData?._id} className="tallenna inline-flex">Poista "{palveluData?.terapia}"</Link>
        </Layout>
    )
}