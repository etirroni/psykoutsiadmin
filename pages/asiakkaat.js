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
        })
    })
    function muokkaaAsiakasta(id) {
        router.push('/asiakkaat/muokkaa/'+id)
    }
    return(
       <Layout>
            <h1 className="text-themeDark text-center">Tallentamasi asiakkaat</h1>
            <p className="text-center">Painamalla linkkiä voit tarkastella tallentamaasi asiakasta tarkemmin tai poistaa sen kokonaan.</p>
            <div className="mb-4 p-4 overflow-y-auto">
                <table className="w-full">
                    <thead>
                        <tr>
                            <td>Nimi:</td>
                            <td>Sähköposti:</td>
                            <td>Osoite:</td>
                            <td>Puhelin:</td>
                        </tr>
                    </thead>
                    <tbody>
                        {asiakkaat.map(asiakas =>(
                         
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
            <div className="p-4 px-0  text-center hover:scale-90 ease-in duration-150">
                <Link className="tallenna ml-4 align-middle" href={'/asiakkaat/uusiasiakas'}>
                    Lisää uusi asiakas
                </Link>
            </div>
       </Layout>
    )
}