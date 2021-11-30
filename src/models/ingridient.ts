import mongoose from 'mongoose';

interface IngredientAttrs {
    ingredient_id: string;
    name: string;
    img: string;
}

interface IngredientDoc extends mongoose.Document{
    ingredient_id: string;
    name: string;
    img: string;
}

interface IngredientModel extends mongoose.Model<IngredientDoc> {
    build(attrs: IngredientAttrs): IngredientDoc;
}

const ingredientSchema = new mongoose.Schema<IngredientDoc>({
    ingredient_id: {
        type: String,
        uniq: true,
        required: true
    },
    name: String,
    img: String,
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
        },
        versionKey: false
    }
});

ingredientSchema.statics.build = (attrs: IngredientAttrs) => {
    return new Ingredient(attrs);
}

const Ingredient = mongoose.model<IngredientDoc, IngredientModel>('ingredients', ingredientSchema);

export { Ingredient };
