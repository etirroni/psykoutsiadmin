import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";
import LomakeTerapiaTiedot from "@/components/LomakeTerapiaTiedot";

export default function MuokkaaPalveluPage() {
    const router = useRouter();
    const {id} = router.query
    useEffect(()=>{
        if(!id){
            "Palvelua ei löytynt id:llä ota yhteys tekniseen tukeen"
        }
        axios.get('/api/palvelut?id='+id).then(response =>{
            console.log(response.data)
        })
    }, [id])


    return(
        <Layout>
            <LomakeTerapiaTiedot/>
        </Layout>
    )
}