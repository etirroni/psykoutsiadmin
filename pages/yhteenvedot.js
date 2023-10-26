import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import {  useEffect, useState } from "react";

export default function YhteenvedotSivu(){
    const [palvelut,setPalvelut]= useState([])
    const [varaukset,setVaraukset]= useState([])
    const [asiakkaat,setAsiakkaat]= useState([])
    const [asiakasValinta, setAsiakasValinta]= useState("")
    const [palveluEhto, setPalveluEhto]= useState("")
    const [minPvmEhto, setMinPvmEhto]= useState("")
    const [maxPvmEhto, setMaxPvmEhto]= useState("")
    const [hakuEhdot, setHakuEhdot]= useState({})
    const [yhteenveto, setYhteenveto]=useState([])
    const router = useRouter()
    useEffect(()=>{
        axios.get('/api/palvelut').then(response=>{
            setPalvelut(response.data)
        })
        axios.get('/api/ajanvaraus').then(response=>{
            setVaraukset(response.data)
        })
        axios.get('/api/asiakkaat').then(response=>{
            setAsiakkaat(response.data)
        })
        console.log("wazaa")
    },[])

    function muodostaHakuehdot(hakuEhto){
        const updatedHakuEhdot = { ...hakuEhdot };
        if (hakuEhto.category==='Palvelu' || hakuEhto.category==='MinPvm'){
            if (updatedHakuEhdot.hasOwnProperty(hakuEhto.category)){
                if (!updatedHakuEhdot[hakuEhto.category].includes(hakuEhto.value)) {
                    updatedHakuEhdot[hakuEhto.category].push(hakuEhto.value);
                }else{
                    return
                }
            }else{
                updatedHakuEhdot[hakuEhto.category] = [hakuEhto.value];
            }
            setHakuEhdot(updatedHakuEhdot)
        }
        
        if (hakuEhto.category==='Delete'){
            setHakuEhdot({})
        }   
    }
    const handleMinPvmChange = (e) => {
        const newMinPvm = e.target.value;
        // Add validation logic to check if maxPvmEhto is greater or equal to newMinPvm
        if (maxPvmEhto >= newMinPvm || maxPvmEhto === '') {
          setMinPvmEhto(newMinPvm);
        }
        else{
            setMaxPvmEhto(newMinPvm);
            setMinPvmEhto(newMinPvm);   
        }
      };
    
      const handleMaxPvmChange = (e) => {
        const newMaxPvm = e.target.value;
        // Add validation logic to check if newMaxPvm is greater or equal to minPvmEhto
        if (newMaxPvm >= minPvmEhto || minPvmEhto === '') {
          setMaxPvmEhto(newMaxPvm);
        }
        else{
            setMaxPvmEhto(newMaxPvm);
            setMinPvmEhto(newMaxPvm);
        }
      };
      function raporttiAsiakas(e){
        const specificVaraus = varaukset.filter((varaus) => varaus.asiakas === e);
        setAsiakasValinta(e)
        setYhteenveto(specificVaraus)
        
      }

    return(
        <Layout>
            <h1 className="text-center">Laadi yhteenvetoja täällä</h1>
            <p className="text-center">Täällä voit hakea asiakkaan perusteella yhteenvetoja eri hakuehdoilla</p>
            <div>
                <p className="inline-block m-0">Valitse seurattava asiakas</p>
                <select className="flex w-full" 
                        value={asiakasValinta} 
                        onChange={(e) => raporttiAsiakas(e.target.value)}>
                    <option 
                        value={""}>
                        Valitse asiakas
                    </option>
                    {asiakkaat.map((asiakas) => (
                        <option key={asiakas._id} value={asiakas.nimi}>
                        {asiakas.nimi}
                        </option>
                    ))
                    }
                </select>
                {asiakasValinta.length > 0 && (
                    <div className="bg-gray-200 flex p-4 rounded-md ">
                        <div className="flex-1 items-center justify-evenly">
                            <div>
                                <p>Palvelut</p>
                                <select value={palveluEhto} onChange={(e) => setPalveluEhto(e.target.value)}>
                                    <option value={""}>Kaikki</option>
                                    {palvelut.map((p)=>(
                                        <option key={p._id} value={p.terapia}>
                                            {p.terapia}
                                        </option>
                                ))}
                                </select>
                                    {palveluEhto.length > 0 &&(
                                        <button className="vihreä" onClick={()=>muodostaHakuehdot({value:palveluEhto, category:'Palvelu'})}>+ hakuehtoihin</button>
                                    )}
                            </div>
                            <div>
                                <p>From:</p>
                                <input
                                    type="date"
                                    value={minPvmEhto}
                                    onChange={handleMinPvmChange}
                                />
                                    {minPvmEhto.length > 0 &&(
                                        <button className="vihreä" onClick={()=>muodostaHakuehdot({value:minPvmEhto, category:'MinPvm'})}>+ hakuehtoihin</button>
                                    )}
                                <p>To:</p>
                                <input
                                    type="date"
                                    value={maxPvmEhto}
                                    onChange={handleMaxPvmChange}
                                />
                                    {maxPvmEhto.length > 0 &&(
                                        <button className="vihreä" onClick={()=>muodostaHakuehdot(maxPvmEhto)}>+ hakuehtoihin</button>
                                    )}
                            </div>
                        </div>
                        <div className="flex flex-1">
                            {Object.keys(hakuEhdot).length > 0 && (
                                <div>
                                    <p>Hakuehtosi:</p>
                                    <ul>
                                        {Object.entries(hakuEhdot).map(([category, values])=>(
                                           <div>
                                                <li key={category}>
                                                    {category}:
                                                    <ul>
                                                        {values.map((value, index)=>(
                                                            <li key={index}>
                                                                {value}, 
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </li>
                                           </div>
                                        ))}
                                    </ul>
                                    <button className="vihreä" 
                                            onClick={()=>muodostaHakuehdot({value:0, category:'Delete'})}>
                                            Tyhjennä ehdot
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )
                }
            </div>
            <div>
                <table className="w-full">
                    <thead>
                        <tr className="items-center">
                            <th className="p-4 text-themeDark">Hakuehdoilla löydetyt tulokset:</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="flex flex-col w-full bg-red-500 items-center">
                            {yhteenveto?.map(sv=>(
                                  <td className="flex p-4 text-center">
                                   {`${sv.asiakas}, ${sv.terapiamuoto}, ${new Date(sv.pvm).toLocaleDateString()}, ${sv.klo}`}
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}