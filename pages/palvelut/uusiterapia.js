import Layout from "@/components/Layout";
import LomakeTerapiaTiedot from "@/components/LomakeTerapiaTiedot";
import Link from "next/link";

export default function UusiTerapia(){
    return(
        <Layout>
            <h1>Lisää uuden terapian tiedot</h1>
            <LomakeTerapiaTiedot/>
        </Layout>
    )
}