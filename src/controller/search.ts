import { Response, Request} from 'express';
import { RecipeService } from '../services/recipe.service';
import { LabelService } from '../services/label.service';

const recipeService = new RecipeService();
const labelService = new LabelService();

export class SearchController {

    async search(req: Request, res: Response): Promise<any> {
        const query: any = req.query;
        const labels = await labelService.getAllLabels();

        if (query['q']) { // text search
            const textSearchResponse = await recipeService.getRecipesByText(query['q']);

            return res.send(textSearchResponse.map(item => {
                return {
                    ...item,
                    labels: this.getLabels(item.labels, labels)
                }
            }));
        }

        if (query['b']) { // key benefints search
            const textSearchResponse = await recipeService.getRecipesByKeyBenefit(query['b']);

            return res.send(textSearchResponse.map(item => {
                return {
                    ...item,
                    labels: this.getLabels(item.labels, labels)
                }
            }));
        }

        if (query['l']) { // search by labels
            const label = await labelService.getLabelByText(query['l']);

            if (!label) {
                return res.status(404).send('Label not found');
            }

            const labelSearchResponse = await recipeService.getRecipesByLabel(label.label_id);

            return res.send(labelSearchResponse.map((item: any) => {
                return {
                    ...item,
                    labels: this.getLabels(item.labels, labels)
                }
            }));
        }

        if(query['t']) {// search by image tag

        }

        return res.status(404).send('Incorrect search');
    }

    private getLabels(recipeLabels: string[], labels: any[]): string[] {
        return recipeLabels
            .map(recipeLabel => {
                    const currentLabel = labels.find(label => label.label_id === recipeLabel);
                    return currentLabel && currentLabel.text? currentLabel.text : '';
                }
            )
            .filter(Boolean);
    }
}