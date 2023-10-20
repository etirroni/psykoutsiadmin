import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";



export default function LomakeAjanvaraus({
    asiakas:oletusAsiakas,
    terapiamuoto:oletusTerapiamuoto,
    pvm:oletusPvm,
    klo: oletusKlo,
    _id,
}){

    const [asiakkaat, setAsiakkaat] = useState([])
    const [terapiamuodot, setTerapiamuodot] = useState([])
    const [asiakas, setAsiakas] = useState(oletusAsiakas || {})
    const [terapiamuoto, setTerapiamuoto] = useState(oletusTerapiamuoto || (""))
    const [pvm, setPvm] = useState(oletusPvm|| (""))
    const [klo, setKlo] = useState(oletusKlo || (""))
    const [takaisinVarauksiin, setTakaisinVarauksiin] = useState("")
    const router = useRouter();

    useEffect(()=>{
        axios.get('/api/asiakkaat').then(response=>{
            setAsiakkaat(response.data)
            console.log("tässä asiakkaat: ", asiakkaat);
        })  
        axios.get('/api/palvelut').then(response=>{
            setTerapiamuodot(response.data)
            console.log("tässä terapiamuodot: ", terapiamuodot)
        })

        
    },[])

    async function luoAika(ev){
        ev.preventDefault();
        if (_id){
            const ajanvarausData = {asiakas,terapiamuoto,pvm,klo,_id}
            await axios.put('/api/ajanvaraus',ajanvarausData)
            console.log("ajanvaraus päivitetty")
        } else {
            const ajanvarausData = {asiakas,terapiamuoto,pvm,klo}
            await axios.post('/api/ajanvaraus', ajanvarausData)
            console.log("ajanvaraus lisätty!")
        }
        setTakaisinVarauksiin(true)
    }
    if (takaisinVarauksiin){
        router.push('/ajanvaraus')
    }
   

    return(
        <div>
            
        <form onSubmit={luoAika} className="flex flex-col">
            <p>Valitse asiakas:</p>
            <select value={asiakas} required  
                    onChange={(e) => setAsiakas(e.target.value)}>
                <option value={""}>Valitse asiakas</option>
                {asiakkaat.map((a)=>(
                       <option key={a._id} value={a.nimi}>{a.nimi}</option>
                      
                ))} 
            </select>
            <p>Valitse terapiamuoto:</p>
            <select value={terapiamuoto} required  onChange={(e) => setTerapiamuoto(e.target.value)}>
                <option value={""}>Valitse terapiamuoto</option>
                {terapiamuodot.map((t)=>(
                       <option key={t._id} value={t.terapia}>{t.terapia}</option>
                ))}
            </select>
            <p>Päivämäärä:</p>
            <input  type="date" 
                value={pvm}  
                required onChange={ev => setPvm(ev.target.value)}/>
            <p>Kellon aika:</p>
            <input  type="time" 
                value={klo}   
                required onChange={ev => setKlo(ev.target.value)}/>
            <div className="flex gap-4">
                <button type="submit" className="tallenna">Tallenna</button>
                <Link href={'/ajanvaraus'} className="tallenna inline-flex">Takaisin tallentamatta muutoksia</Link>
            </div>
           
        </form>
    </div>
    )
}