import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/router"

export default function LomakeTerapiaTiedot(){
    const [terapia, setTerapia] = useState('')
    const [kuvaus, setKuvaus] = useState('')
    const [kesto, setKesto] = useState('')
    const [hinta, setHinta] = useState('')
    const [toPalvelut, setToPalvelut] = useState(false)
    const router = useRouter();
    async function luoTerapia(ev){
        ev.preventDefault();
        const terapiaData = {terapia,kuvaus,kesto,hinta}
        await axios.post('/api/palvelut', terapiaData)
        setToPalvelut(true)
    }
    if (toPalvelut){
        router.push('/palvelut')
    }
    return(
        <div>
            <h1>Lisää uuden terapian tiedot</h1>
            <form onSubmit={luoTerapia} className="flex flex-col">
                <input  type="text" placeholder="Terapian nimi" value={terapia} required onChange={ev => setTerapia(ev.target.value)}/>
                <input  type="text" placeholder="Kuvaus" value={kuvaus} required onChange={ev => setKuvaus(ev.target.value)}/>
                <input  type="number" placeholder="Kesto ( min )" value={kesto} required onChange={ev => setKesto(ev.target.value)}/>
                <input  type="number" placeholder="Hinta €" value={hinta} required onChange={ev => setHinta(ev.target.value)}/>
                <button type="submit" className="tallenna">Tallenna</button>
        </form>
        </div>
        
    )
}