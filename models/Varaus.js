import { Schema, model, models } from "mongoose";

const VarausSchema = new Schema({
    asiakas:{type:String, required:true},
    terapiamuoto:{type:String, required:true},
    pvm:{type:String, required:true},
    klo:{type:String, required:true},
})

export const Varaus = models.Varaus || model('Varaus', VarausSchema)