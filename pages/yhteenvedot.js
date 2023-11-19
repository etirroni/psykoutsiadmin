import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function YhteenvedotSivu(){
    const [palvelut,setPalvelut]= useState([])
    const [varaukset,setVaraukset]= useState([])
    const [asiakkaat,setAsiakkaat]= useState([])
    const [asiakasValinta, setAsiakasValinta]= useState("")
    const [palveluEhto, setPalveluEhto]= useState("")
    const [minPvmEhto, setMinPvmEhto]= useState("")
    const [maxPvmEhto, setMaxPvmEhto]= useState("")
    const [hakuEhdot, setHakuEhdot]= useState({})
    const [yhteenveto, setYhteenveto]=useState(varaukset)

    
    useEffect(()=>{
        axios.get('/api/palvelut').then(response=>{
            setPalvelut(response.data)
        })
        axios.get('/api/ajanvaraus').then(response=>{
            setVaraukset(response.data)
            //setYhteenveto(response.data)
        })
        axios.get('/api/asiakkaat').then(response=>{
            setAsiakkaat(response.data)
        })
        console.log("once")
    },[])
    useEffect(()=>{
        hakuEhdoilla(hakuEhdot)
        console.log("once, hakuehdot ovat: ", [hakuEhdot])
    },[hakuEhdot])

  


    function muodostaHakuehdot(hakuEhto){
        const updatedHakuEhdot = { ...hakuEhdot };
        /*---------PALVELU--------*/ 
        if (hakuEhto.category==='Palvelu'){
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
        /*---------------PVM------------*/ 
        if (hakuEhto.category==='Pvm'){
         
            if(updatedHakuEhdot.hasOwnProperty(hakuEhto.categroy)){
                updatedHakuEhdot[value]=(hakuEhto.value)
            }else{
                updatedHakuEhdot[hakuEhto.category] = [hakuEhto.value];
            }
            setHakuEhdot(updatedHakuEhdot)
        }
        /*---------------ASIAKAS----------------*/
        if (hakuEhto.category==='Asiakas'){
            if (updatedHakuEhdot.hasOwnProperty(hakuEhto.category)){
                if (!updatedHakuEhdot[hakuEhto.category].includes(hakuEhto.value)) {
                    updatedHakuEhdot[hakuEhto.category].push(hakuEhto.value);
                }else{
                    return
                }
                if (hakuEhto.value===""){
                    updatedHakuEhdot[hakuEhto.category] = [hakuEhto.value]
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
        if (newMaxPvm >= minPvmEhto || minPvmEhto === '') {
          setMaxPvmEhto(newMaxPvm);
        }
        else{
            setMaxPvmEhto(newMaxPvm);
            setMinPvmEhto(newMaxPvm);
        }
      };

    function hakuEhdoilla(ehdot){
        console.log("ehdot ovat tässä: ", ehdot)
        let filteredVaraukset=varaukset
        let aloitusPvm
        let lopetusPvm
        if(ehdot && ehdot.Pvm && ehdot.Pvm.length > 0){        
                aloitusPvm=ehdot.Pvm[0][0]
                lopetusPvm=ehdot.Pvm[0][1]      
        } 
        if (ehdot) {
            console.log("IN EHDOT aloituspvm: ", aloitusPvm," lopetusPvm: ",lopetusPvm)
            filteredVaraukset = filteredVaraukset.filter((varaus) => {
                const asiakasFilter = !ehdot.Asiakas || ehdot.Asiakas.includes(varaus.asiakas);
                const palveluFilter = !ehdot.Palvelu || ehdot.Palvelu.includes(varaus.terapiamuoto);
                const pvmFilter =
                    !aloitusPvm ||
                    (new Date(aloitusPvm) <= new Date(varaus.pvm) &&
                        (!lopetusPvm || new Date(lopetusPvm) >= new Date(varaus.pvm)));
                return asiakasFilter && palveluFilter && pvmFilter;
            });
            setYhteenveto(filteredVaraukset);  
        }
        else{
            setYhteenveto(varaukset)
        }
    }

    return(
        <Layout>
            <h1 className="text-center">Laadi yhteenvetoja täällä</h1>
            <p className="text-center">Täällä voit hakea asiakkaan perusteella yhteenvetoja eri hakuehdoilla</p>
            <div>
                <div className="bg-gray-200 flex p-4 rounded-md shadow-md shadow-themeSlate">
                    <div className="flex-1">
                        <div>
                            <p>Asiakas</p>
                            <select 
                                    value={asiakasValinta} 
                                    onChange={(e) => setAsiakasValinta(e.target.value)}>
                                <option 
                                    value={""}>
                                    Hae asiakkaan perusteella
                                </option>
                                {asiakkaat.map((asiakas) => (
                                    <option key={asiakas._id} value={asiakas.nimi}>
                                    {asiakas.nimi}
                                    </option>
                                ))
                                }
                            </select>
                            {asiakasValinta.length > 0 &&(
                                <button className="vihreä" onClick={()=>muodostaHakuehdot({value:asiakasValinta, category:'Asiakas'})}>+ hakuehtoihin</button>
                            )}
                        </div>
                        <div>
                                <p>Palvelut</p>
                                <select value={palveluEhto} onChange={(e) => setPalveluEhto(e.target.value)}>
                                    <option value={""}>Hae palvelun perusteella</option>
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
                            <p>Aikaväli:</p>
                            <div className="flex gap-4">
                                <input
                                    type="date"
                                    value={minPvmEhto}
                                    onChange={handleMinPvmChange}
                                />
                                {minPvmEhto.length > 0 &&(
                                     <input
                                         type="date"
                                         value={maxPvmEhto}
                                         onChange={handleMaxPvmChange}
                                     /> 
                                )}  
                                {minPvmEhto.length > 0 &&( 
                                <button className="vihreä" 
                                        onClick={()=>muodostaHakuehdot({
                                            value:[minPvmEhto,maxPvmEhto], 
                                            category:"Pvm"})}>
                                    + Lisää
                                </button>
                                )}
                                {hakuEhdot.hasOwnProperty("Pvm") && (
                                    <button className="vihreä">
                                       − Poista
                                    </button>
                                    )
                                }
                            </div>
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
                                                        {value} 
                                                    </li>
                                                    ))}
                                            </ul>
                                        </li>
                                    </div>
                                   ))}
                                </ul>
                                    <button className="vihreä" 
                                            onClick={()=>muodostaHakuehdot({value:"delete", category:'Delete'})}>
                                            Tyhjennä ehdot
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                
                
            </div>
            <div>
               <div>
                    <h1 className="p-4 mt-4 text-themeDark">Hakuehdoilla löydetyt tulokset:</h1>
                        <div className="flex flex-col bg-gray-200 rounded-md shadow-md shadow-themeSlate">
                        {yhteenveto?.length > 0 ? (
                        <div className="flex w-full justify-between p-2 underline underline-offset-4">
                            <p>Asiakas</p>
                            <p>Tuote</p>
                            <p>Päivämäärä</p>
                            <p>Maksettu?</p>
                        </div>
                        ) : (
                            <p className="text-center p-8">Ei tuloksia valituilla ehdoilla.</p>
                        )}
                            {yhteenveto?.sort((a,b)=> new Date(b.pvm) - new Date(a.pvm))
                            .map(sv=>(
                                <div className="flex w-full justify-between p-4 border-t-2 border-dashed border-white hover:bg-gray-300 ease-in duration-150">
                                  <p>{sv.asiakas}</p>
                                  <p>{sv.terapiamuoto}</p>
                                  <p>{sv.pvm}</p>
                                  <p>joo / ei</p>
                                </div>
                            ))}
                        </div>
                </div>
                <div className="flex justify-center mt-4 p-4">
                    <button className="vihreä">Tulosta tuloksista yhteenveto</button>
                </div>
            </div>
        </Layout>
    )
}