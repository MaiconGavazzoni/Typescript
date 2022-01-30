import { parse as csvParse } from 'csv-parse';
import fs from 'fs';
import { ICategoryRepository } from '../../repositories/ICategoriesRepository';

interface IImportCategory {
  name: string;
  description: string;
}




class ImportCategoryUseCase {
  constructor(private categoriesRepository: ICategoryRepository) { }


  loadCategories(file: Express.Multer.File) {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];
      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile.on("data", async (line: IImportCategory) => {
        const [name, description]: any = line;
        categories.push({
          name,
          description
        });
      }).on("end", () => {
        //faz a remoção do arquivo da pasta tmp após ter sido usado
        fs.promises.unlink(file.path);

        //devolve o [] da variável categories com todos dados do arquivo
        resolve(categories);
      })
        .on("error", (err: any) => {
          reject(err);
        })
    });
  }

  async execute(file: Express.Multer.File) {
    const categories = await this.loadCategories(file);
    categories.map(async (category: IImportCategory) => {
      const { name, description } = category;
      const existsCategory = this.categoriesRepository.findByName(name);

      if (!existsCategory) {
        this.categoriesRepository.create({
          name,
          description
        })
      }
    })
  }

}

export { ImportCategoryUseCase };