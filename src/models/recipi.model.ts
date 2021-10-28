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
}

interface RecipeAttrs {
    name: string;
    title: string;
    videoUrl: string;
    breadCrumbs: RecipeBreadCrumb[];
    badges: RecipeBadge[];
    overviewParagraphs: string[];
    labels: string;
    lottie: string;
    ingredients: RecipeIngredient[];
}

interface RecipeDoc extends mongoose.Document{
    name: string;
    title: string;
    videoUrl: string;
    breadCrumbs: RecipeBreadCrumb[];
    badges: RecipeBadge[];
    overviewParagraphs: string[];
    labels: string[];
    lottie: string;
    ingredients: RecipeIngredient[];
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
    breadCrumbs: [{
        link: String,
        title: String
    }],
    badges: [{
        type: String,
        title: String
    }],
    labels: [
        String
    ],
    lottie: String,
    ingredients: [{
        title: String,
        info: String,
        imgUrl: String,
    }]
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

const Recipe = mongoose.model<RecipeDoc, RecipeModel>('recipes', recipeSchema);

export { Recipe };