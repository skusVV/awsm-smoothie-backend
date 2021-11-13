import mongoose from 'mongoose';

interface LabelAttrs {
    label_id: string;
    text: string;
}

interface LabelDoc extends mongoose.Document{
    label_id: string;
    text: string;
}

interface LabelModel extends mongoose.Model<LabelDoc> {
    build(attrs: LabelAttrs): LabelDoc;
}

const labelSchema = new mongoose.Schema<LabelDoc>({
    label_id: {
        type: String,
        uniq: true,
        required: true
    },
    text: String,
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

labelSchema.statics.build = (attrs: LabelAttrs) => {
    return new Label(attrs);
}

const Label = mongoose.model<LabelDoc, LabelModel>('labels', labelSchema);

export { Label };