import mongoose from 'mongoose';

interface RecipeBadge {
    type: string;
    title: string;
}

interface RecipeBreadCrumb {
    link: string;
    title: string;
}

interface RecipeIngredient {
    title: string;
    info: string;
    imgUrl: string;
    ingredient_id: string;
}

type KeyBenefit = 'immunity' | 'muscle' | 'appearance' | 'weight' | 'energy';
type ProteinType = 'Why Protein' | 'Casein Protein' | 'Pea Protein' | 'Rice Protein' | 'Oat Protein' | 'Plant Based';
type DietType = 'Keto' | 'Plant Based' | 'Vegan' | 'Whole30' | 'Paleo';

export interface RecipeAttrs {
    name: string;
    title: string;
    videoUrl: string;
    // breadCrumbs: RecipeBreadCrumb[];
    badges: RecipeBadge[];
    overviewParagraphs: string[];
    labels: string;
    // lottie: string;
    ingredients: RecipeIngredient[];
    author_id: string;
    timeToRead: number;
    date: string;
    categories: string[];
    images: string[];
    overviewDescription: string;
    protein: number;
    fats: number;
    carbs: number;
    calories: number;
    meal_replacement: boolean;
    nut_free: boolean;
    caffeine: boolean;
    gluten_free: boolean;
    soy_free: boolean;
    no_sugar: boolean;
    key_benefit: KeyBenefit;
    protein_type: ProteinType;
    diet_type: DietType;
}

interface RecipeDoc extends mongoose.Document{
    name: string;
    title: string;
    videoUrl: string;
    // breadCrumbs: RecipeBreadCrumb[];
    badges: RecipeBadge[];
    overviewParagraphs: string[];
    labels: string[];
    // lottie: string;
    ingredients: RecipeIngredient[];
    author_id: string;
    timeToRead: number;
    date: string;
    categories: string[];
    images: string[];
    overviewDescription: string;
    protein: number;
    fats: number;
    carbs: number;
    calories: number;
    meal_replacement: boolean;
    nut_free: boolean;
    caffeine: boolean;
    gluten_free: boolean;
    soy_free: boolean;
    no_sugar: boolean;
    key_benefit: KeyBenefit;
    protein_type: ProteinType;
    diet_type: DietType;
    reviewer_id: string;
    reviewer?: string;
}

interface RecipeModel extends mongoose.Model<RecipeDoc> {
    build(attrs: RecipeAttrs): RecipeDoc;
}

const recipeSchema = new mongoose.Schema<RecipeDoc>({
    name: {
        type: String,
        uniq: true,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    // breadCrumbs: [{
    //     link: String,
    //     title: String
    // }],
    badges: [{
        type: String,
        title: String
    }],
    labels: [
        String
    ],
    // lottie: String,
    ingredients: [{
        title: String,
        info: String,
        imgUrl: String,
    }],
    author_id: String,
    timeToRead: Number,
    date: String,
    categories: [String],
    images: [String],
    overviewDescription: String,
    protein: Number,
    fats: Number,
    carbs: Number,
    calories: Number,
    meal_replacement: Boolean,
    nut_free: Boolean,
    caffeine: Boolean,
    gluten_free: Boolean,
    soy_free: Boolean,
    no_sugar: Boolean,
    key_benefit: String,
    protein_type: String,
    diet_type: String,
    reviewer_id: String
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

recipeSchema.statics.build = (attrs: RecipeAttrs) => {
    return new Recipe(attrs);
}
recipeSchema.index({ title: 'text', overviewDescription : 'text'  });
const Recipe = mongoose.model<RecipeDoc, RecipeModel>('recipes', recipeSchema);

export { Recipe };