import Layout from "@/components/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Palvelut() {
    const [palvelut,setPalvelut]= useState([])
    useEffect(()=>{
        axios.get('/api/palvelut').then(response=>{
            setPalvelut(response.data)
        })
    })
    return(
        <Layout>
            <h1>Tallentamasi terapiapalvelut</h1>
            <div className="overflow-y-auto mb-4 p-4">
                <table>
                    <thead>
                        <tr>
                            <td>Terapia:</td>
                            <td>Kuvaus:</td>
                            <td>Kesto:</td>
                            <td>Hinta:</td>
                        </tr>
                    </thead>
                    <tbody>
                        {palvelut.map(palvelu =>(
                            <tr>
                                <td>{palvelu.terapia}</td>
                                <td>{palvelu.kuvaus}</td>
                                <td>{palvelu.kesto} min</td>
                                <td>{palvelu.hinta} €</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Link className="tallenna" href={'/palvelut/uusiterapia'}>
                Lisää uusi terapia
            </Link>
        </Layout>
    )
}