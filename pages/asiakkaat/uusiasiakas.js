import Layout from "@/components/Layout";
import LomakeAsiakasTiedot from "@/components/LomakeAsiakasTiedot";

import Link from "next/link";

export default function UusiTerapia(){
    return(
        <Layout>
            <h1>Lisää uuden asiakkaan tiedot</h1>
            <LomakeAsiakasTiedot/>
        </Layout>
    )
}