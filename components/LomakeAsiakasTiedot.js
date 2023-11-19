import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"

export default function LomakeAsiakasTiedot({
    nimi:oletusNimi,
    email:oletusEmail,
    osoite:oletusOsoite,
    puhelin: oletusPuhelin,
    _id,
}){
    
    const [nimi, setNimi] = useState(oletusNimi ||(''))
    const [email, setEmail] = useState(oletusEmail || (''))
    const [osoite, setOsoite] = useState(oletusOsoite || (''))
    const [puhelin, setPuhelin] = useState(oletusPuhelin || (''))
    const [toAsiakkaat, setToAsiakkaat] = useState(false)
    const router = useRouter();

    async function luoAsiakas(ev){
        ev.preventDefault();
        if (_id){ /*asiakkaan muokkaus*/ 
            const asiakasData = {nimi,email,osoite,puhelin,_id}
            await axios.put('/api/asiakkaat',asiakasData)
            console.log("Asiakas päivitetty")
        } else { /*asiakkaan lisäys*/ 
            const asiakasData = {nimi,email,osoite,puhelin}
            await axios.post('/api/asiakkaat', asiakasData)
            console.log("Asiakas lisätty")
        }
        setToAsiakkaat(true)
    }
    if (toAsiakkaat){
        router.push('/asiakkaat')
    }
  
    return(
        <div>
            
            <form onSubmit={luoAsiakas} className="flex flex-col">
                <p>Asiakkaan / yrityksen nimi:</p>
                <input  type="text" placeholder="Matti Meikäläinen" value={nimi} required onChange={ev => setNimi(ev.target.value)}/>
                <p>Sähköposti:</p>
                <input  type="email" placeholder="meikalainen@gmail.com" value={email} required onChange={ev => setEmail(ev.target.value)}/>
                <p>Osoite:</p>
                <input  type="text" placeholder="meikalaiesentie 4 a 2, Rovaniemi, 96200 " value={osoite} required onChange={ev => setOsoite(ev.target.value)}/>
                <p>Puhelin numero:</p>
                <input  type="text" placeholder="0401234567,+358407608843" value={puhelin} required onChange={ev => setPuhelin(ev.target.value)}/>
                <div className="flex gap-4">
                <button type="submit" className="tallenna">Tallenna</button>
                <Link href={'/asiakkaat/'} className="tallenna inline-flex">Takaisin tallentamatta muutoksia</Link>
                </div>
               
        </form>
        </div>
        
    )
}