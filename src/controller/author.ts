import { Response, Request} from 'express';
import { RecipeService } from '../services/recipe.service';
import { AuthorService } from '../services/author.service';

const recipeService = new RecipeService();
const authorService = new AuthorService();

export class AuthorController {

    async getAuthor(req: Request, res: Response): Promise<any> {
        const params: any = req.params;
        const author = await authorService.getAuthorByName(params.id)
        const recipes = await recipeService.getRecipeisByAuthorId(params.id, { title: 1, _id: 0, name: 1, images: 1 });
        const mappedRecipies = recipes.map(item => {
            // TODO imageUrl should be in the DB
            return { title: item.title, imageUrl: item.images[0], link: `/recipe/${item.name}` }
        });

        if (!author) {
            return res.status(404).send('Author not found');
        }

        return res.send({
            description: author.description,
            imageUrl: author.imageUrl,
            name: author.name,
            recipes: mappedRecipies || [],
            subName: author.subName,
            social: author.social,
            metaData: author.metaData
        });
    }
}
