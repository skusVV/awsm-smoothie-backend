import { Author } from '../models/author.model';

export class AuthorService {

    async getAuthorByName(author_id: string = '', projection = {}) {
        return Author.findOne({ author_id }, projection).lean();
    }
}