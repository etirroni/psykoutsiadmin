import { mongooseConnect } from "@/lib/mongoose"
import { Terapia } from "@/models/Terapia";



export default async function handler(req,res) {
    const {method} = req
    await mongooseConnect();
    if (method==='GET') {
        if(req.query?.id){
            res.json(await Terapia.findOne({_id:req.query.id}))
        } else {
        res.json(await Terapia.find())
        }
    }

    if (method==='POST'){
        const {terapia,kuvaus,kesto,hinta} = req.body
        const terapiaDoc = await Terapia.create({
            terapia,kuvaus,kesto,hinta
        })
        res.json(terapiaDoc)

    }
}