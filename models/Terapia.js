import {Schema,models, model} from "mongoose";

const TerapiaSchema = new Schema({
    terapia:{type:String, required:true},
    kuvaus:{type:String, required:true},
    kesto:{type:Number, required:true},
    hinta:{type:Number, required:true},
})

export const Terapia = models.Terapia || model('Terapia', TerapiaSchema)
