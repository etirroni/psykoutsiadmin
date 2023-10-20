import Layout from "@/components/Layout";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AjanvarausSivu(){
    const [varaukset,setVaraukset]= useState([])
    const router = useRouter()

    useEffect(()=>{
        axios.get('/api/ajanvaraus').then(response=>{
            setVaraukset(response.data)
        })
    },[])

    function muokkaaKohdetta(id) {
        router.push('/ajanvaraus/muokkaa/'+id)
    }

    function muokkaaPvm(pvm) {
        const date = new Date(pvm);
        const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
        return date.toLocaleDateString("fi-FI", options);
    }

    return(
        <Layout>
            <h1 className="text-center">Tallennetut ajanvaraukset</h1>
            <p className="text-center">Täällä pystyt lisäämään ja seuraamaan varaamiasi asiakasaikoja.</p>
            <div className="mb-4 p-4 overflow-y-auto">
                <table className="w-full">
                    <thead>
                        <tr>
                            <td>Asiakas:</td>
                            <td>Terapia:</td>
                            <td>PVM:</td>
                            <td>KLO:</td>
                        </tr>
                    </thead>
                    <tbody>
                        {varaukset.map(v =>(
                         
                                <tr key={v._id} onClick={() => muokkaaKohdetta(v._id)} className="cursor-pointer"> 

                                    <td>{v.asiakas}</td>     
                                    <td>{v.terapiamuoto}</td>     
                                    <td>{muokkaaPvm(v.pvm)}</td>    
                                    <td>{v.klo}</td>    
                                    
                                </tr>
                           
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="p-4 px-0  text-center hover:scale-90 ease-in duration-150">
                <Link className="tallenna ml-4 align-middle" href={'/ajanvaraus/uusiaika'}>
                    Uusi ajanvaraus
                </Link>
            </div>
        </Layout>
    )
}