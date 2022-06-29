import { Ingredient } from '../models/ingridient';

export class IngredientService {

    async getIngredientsByIds(ids: string[]) {
        console.log((await Ingredient.find({}, {name: 1}).lean()).map(el => el.name.toLowerCase()).sort((a:string, b:string) => b.length - a.length))
        console.log((await Ingredient.find({}, {name: 1}).lean()).map(el => el.name.toLowerCase()).sort((a:string, b:string) => b.length - a.length).slice(98))
        return Ingredient.find({ ingredient_id: { $in: ids } }).lean();
    }

    async getAllIngredients() {
        return Ingredient.find( {}).lean();
    }

    async getAllIngredientNames() {
        return Ingredient.find({}, { name: 1 }).lean();
    }
}