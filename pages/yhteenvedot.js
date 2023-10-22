import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function YhteenvedotSivu(){
    const [palvelut,setPalvelut]= useState([])
    const [varaukset,setVaraukset]= useState([])
    const [asiakkaat,setAsiakkaat]= useState([])
    const router = useRouter()
    useEffect(()=>{
        axios.get('/api/palvelut').then(response=>{
            setPalvelut(response.data)
        })
        axios.get('/api/ajanvaraus').then(response=>{
            setVaraukset(response.data)
        })
        axios.get('/api/asiakkaat').then(response=>{
            setAsiakkaat(response.data)
        })
        console.log(varaukset)
    },[])
    return(
        <Layout>
            <h1 className="text-center">Laadi yhteenvetoja täällä</h1>
            <div>
                <select>
                    {asiakkaat.map(asiakas =>(
                    <option>{asiakas.nimi}</option>))
                    }
                </select>
            </div>
        </Layout>
    )
}