import { mongooseConnect } from "@/lib/mongoose"
import { Asiakas } from "@/models/Asiakas";

export default async function handler(req,res) {
    const {method} = req
    await mongooseConnect();

    if (method==='GET') {
        if(req.query?.id){
            const magic= req.query.id.toString()
            res.json(await Asiakas.findOne({_id:magic}))
        } else {
        res.json(await Asiakas.find())
        }
    }
    if (method==='PUT'){
        const {nimi,osoite,email,puhelin,_id}= req.body
        await Asiakas.updateOne({_id},{nimi,osoite,email,puhelin})
        res.json(true)
    }

    if (method==='POST'){
        const {nimi,osoite,email,puhelin} = req.body
        const asiakasDoc = await Asiakas.create({
            nimi,osoite,email,puhelin
        })
        res.json(asiakasDoc)

    }

    if (method==='DELETE'){
        if(req.query?.id){
        const id = req.query.id
        await Asiakas.deleteOne({_id:id})
        res.json(true)
    }
    }
}