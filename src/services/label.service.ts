import { Label } from '../models/label.model';

export class LabelService {

    async getAllLabels() {
        return Label.find({}).lean();
    }

    async getLabelByText(text: string) {
        return Label.findOne({ text }).lean();
    }
}