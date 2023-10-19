import { mongooseConnect } from "@/lib/mongoose"
import { Terapia } from "@/models/Terapia";

export default async function handler(req,res) {
    const {method} = req
    await mongooseConnect();

    if (method==='GET') {
        if(req.query?.id){
            const magic= req.query.id.toString()
            res.json(await Terapia.findOne({_id:magic}))
        } else {
        res.json(await Terapia.find())
        }
    }
    if (method==='PUT'){
        const {terapia,kuvaus,kesto,hinta,_id}= req.body
        await Terapia.updateOne({_id},{terapia,kuvaus,kesto,hinta})
        res.json(true)
    }

    if (method==='POST'){
        const {terapia,kuvaus,kesto,hinta} = req.body
        const terapiaDoc = await Terapia.create({
            terapia,kuvaus,kesto,hinta
        })
        res.json(terapiaDoc)

    }

    if (method==='DELETE'){
        if(req.query?.id){
        const id = req.query.id
        await Terapia.deleteOne({_id:id})
        res.json(true)
    }
    }
}