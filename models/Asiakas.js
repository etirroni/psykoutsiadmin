import {Schema,models, model} from "mongoose";

const AsiakasSchema = new Schema({
    nimi:{type:String, required:true},
    email:{type:String, required:true},
    osoite:{type:String, required:true},
    puhelin:{type:String, required:true},
})

export const Asiakas = models.Asiakas || model('Asiakas', AsiakasSchema)