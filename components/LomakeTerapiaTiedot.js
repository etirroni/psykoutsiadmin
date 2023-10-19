import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"

export default function LomakeTerapiaTiedot({
    terapia:oletusTerapia,
    kuvaus:oletusKuvaus,
    kesto:oletusKesto,
    hinta: oletusHinta,
    _id,
}){
    
    const [terapia, setTerapia] = useState(oletusTerapia ||(''))
    const [kuvaus, setKuvaus] = useState(oletusKuvaus || (''))
    const [kesto, setKesto] = useState(oletusKesto || (''))
    const [hinta, setHinta] = useState(oletusHinta || (''))
    const [toPalvelut, setToPalvelut] = useState(false)
   
    const router = useRouter();
    async function luoTerapia(ev){
        ev.preventDefault();
        if (_id){
            const terapiaData = {terapia,kuvaus,kesto,hinta,_id}
            await axios.put('/api/palvelut',terapiaData)
            console.log("Terapia päivitetty")
        } else {
            const terapiaData = {terapia,kuvaus,kesto,hinta}
            await axios.post('/api/palvelut', terapiaData)
            console.log("Terapia lisätty!")
        }
        setToPalvelut(true)
    }
    if (toPalvelut){
        router.push('/palvelut')
    }
  
    return(
        <div>
            
            <form onSubmit={luoTerapia} className="flex flex-col">
                <p>Terapia:</p>
                <input  type="text" placeholder="Terapian nimi" value={terapia} required onChange={ev => setTerapia(ev.target.value)}/>
                <p>Kuvaus:</p>
                <input  type="text" placeholder="Kuvaus" value={kuvaus} required onChange={ev => setKuvaus(ev.target.value)}/>
                <p>Kesto (min):</p>
                <input  type="number" placeholder="Kesto ( min )" value={kesto} required onChange={ev => setKesto(ev.target.value)}/>
                <p>Hinta (€):</p>
                <input  type="number" placeholder="Hinta €" value={hinta} required onChange={ev => setHinta(ev.target.value)}/>
                <div className="flex gap-4">
                <button type="submit" className="tallenna">Tallenna</button>
                <Link href={'/palvelut/'} className="tallenna inline-flex">Takaisin tallentamatta muutoksia</Link>
                </div>
               
        </form>
        </div>
        
    )
}