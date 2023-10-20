import { mongooseConnect } from "@/lib/mongoose"
import { Varaus } from "@/models/Varaus";

export default async function handler(req,res) {
    const {method} = req
    await mongooseConnect();

    if (method==='GET') {
        if(req.query?.id){
            const magic= req.query.id.toString()
            res.json(await Varaus.findOne({_id:magic}))
        } else {
        res.json(await Varaus.find())
        }
    }
    if (method==='PUT'){
        const {asiakas,terapiamuoto,pvm,klo,_id}= req.body
        await Varaus.updateOne({_id},{asiakas,terapiamuoto,pvm,klo})
        res.json(true)
    }

    if (method==='POST'){
        const {asiakas,terapiamuoto,pvm,klo} = req.body
        console.log("req.body: ", req.body)
        const varausDoc = await Varaus.create({
            asiakas,terapiamuoto,pvm,klo
        })
        varausDoc.pvm = varausDoc.pvm.toISOString().split("T")[0];
        console.log("varausDoc: ", varausDoc)
        res.json(varausDoc)

    }

    if (method==='DELETE'){
        if(req.query?.id){
        const id = req.query.id
        await Varaus.deleteOne({_id:id})
        res.json(true)
    }
    }
}