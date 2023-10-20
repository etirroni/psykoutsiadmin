import Layout from "@/components/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";


export default function Palvelut() {
    const [palvelut,setPalvelut]= useState([])
    const router = useRouter()
    useEffect(()=>{
        axios.get('/api/palvelut').then(response=>{
            setPalvelut(response.data)
        })
    },[])

    function muokkaaKohdetta(id) {
        router.push('/palvelut/muokkaa/'+id)
    }
    return(
        <Layout>
            <h1 className="text-themeDark text-center">Tallentamasi terapiapalvelut</h1>
            <p className="text-center">Painamalla linkkiä voit tarkastella tallentamaasi kohdetta tarkemmin tai poistaa sen kokonaan.</p>
            <div className="mb-4 p-4 overflow-y-auto">
                <table className="w-full">
                    <thead>
                        <tr>
                            <td>Terapian nimi:</td>
                            <td>Kuvaus:</td>
                            <td>Kesto:</td>
                            <td>Hinta:</td>
                        </tr>
                    </thead>
                    <tbody>
                        {palvelut.map(palvelu =>(
                         
                                <tr key={palvelu._id} onClick={() => muokkaaKohdetta(palvelu._id)} className="cursor-pointer"> 

                                    <td>{palvelu.terapia}</td>     
                                    <td>{palvelu.kuvaus}</td>     
                                    <td>{palvelu.kesto} min</td>    
                                    <td>{palvelu.hinta} €</td>    
                                    
                                </tr>
                           
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="p-4 px-0  text-center hover:scale-90 ease-in duration-150">
                <Link className="tallenna ml-4 align-middle" href={'/palvelut/uusiterapia'}>
                    Lisää uusi terapia
                </Link>
            </div>
        </Layout>
    )
}