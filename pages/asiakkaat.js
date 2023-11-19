import Layout from "@/components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";


export default function Asiakkaat() {
    const [asiakkaat,setAsiakkaat]= useState([])
    const router = useRouter()
    useEffect(()=>{
        axios.get('/api/asiakkaat').then(response=>{
            setAsiakkaat(response.data)
            console.log("wazaa")
        })
    }, [])
    function muokkaaAsiakasta(id) {
        router.push('/asiakkaat/muokkaa/'+id)
    }
    return(
       <Layout>
            <h1 className="text-themeDark text-center">Tallentamasi asiakkaat</h1>
            <p className="text-center">Klikkaamalla linkkiä voit tarkastella, muokata tai poistaa tallentamasi asiakkaan.</p>
            <div className="mb-4 p-4 overflow-y-auto ">
                <table className="perustable w-full">
                    <thead>
                        <tr>
                            <td>Nimi:</td>
                            <td>Sähköposti:</td>
                            <td>Osoite:</td>
                            <td>Puhelin:</td>
                        </tr>
                    </thead>
                    <tbody>
                        {asiakkaat
                            .sort((a, b) => a.nimi.localeCompare(b.nimi))
                            .map(asiakas =>(
                                <tr key={asiakas._id} onClick={() => muokkaaAsiakasta(asiakas._id)} className="cursor-pointer"> 
                                    <td>{asiakas.nimi}</td>     
                                    <td>{asiakas.email}</td>     
                                    <td>{asiakas.osoite}</td>    
                                    <td>{asiakas.puhelin}</td>      
                                </tr>   
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="p-4 flex">
                <Link className="tallenna mx-auto" href={'/asiakkaat/uusiasiakas'}>
                    Lisää uusi asiakas
                </Link>
            </div>
       </Layout>
    )
}