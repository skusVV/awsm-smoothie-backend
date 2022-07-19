import mongoose from 'mongoose';

interface CategoryItem {
    title: string;
    description: string;
}

interface TodoItem {
    id: number;
    active: boolean;
    title: string;
    description: string;
}
interface ContentItem {
    nodeType: string;
    content: string;
    href?: string;
}
interface CategoryAttrs {
    category_id: string;
    main_title: string;
    secondary_title: string;
    main_description: string;
    secondary_description: string;
    items: CategoryItem[];
    category_banner_description: string;
    category_banner_img: string;
    preview_img: string;
    todos: TodoItem[];
    content_main: ContentItem[];
    content_bottom: ContentItem[];
}

interface CategoryDoc extends mongoose.Document{
    category_id: string;
    main_title: string;
    secondary_title: string;
    main_description: string;
    secondary_description: string;
    items: CategoryItem[];
    category_banner_description: string;
    category_banner_img: string;
    preview_img: string;
    todos: TodoItem[];
    content_main: ContentItem[];
    content_bottom: ContentItem[];
}

interface CategoryModel extends mongoose.Model<CategoryDoc> {
    build(attrs: CategoryAttrs): CategoryDoc;
}

const categorySchema = new mongoose.Schema<CategoryDoc>({
    category_id: {
        type: String,
        uniq: true,
        required: true
    },
    main_title: String,
    secondary_title: String,
    main_description: String,
    secondary_description: String,
    items: [{
        title: String,
        description: String
    }],
    category_banner_description: String,
    category_banner_img: String,
    preview_img: String,
    meta_data : {
        title: String,
        description: String,
        keyword_group: String
    },
    todos: [{
        title: String,
        description: String,
        id: Number,
        active: Boolean
    }],
    content_main: [{
        nodeType: String,
        content: String
    }],
    content_bottom: [{
        nodeType: String,
        content: String,
        href: String
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

categorySchema.statics.build = (attrs: CategoryAttrs) => {
    return new Category(attrs);
}

const Category = mongoose.model<CategoryDoc, CategoryModel>('category', categorySchema);

export { Category };
