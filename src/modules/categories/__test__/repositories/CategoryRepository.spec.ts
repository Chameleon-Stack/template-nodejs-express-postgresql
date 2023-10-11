import { Repository } from 'typeorm';
import { dataSource } from '../../../../shared/infra/typeorm';
import { Category } from '../../infra/typeorm/entities/Category';
import { CategoryRepository } from '../../infra/typeorm/repositories/CategoryRepository';
import { ICategoryRepository } from '../../repositories/ICategoryRepository';

describe('Category repository test', () => {
  let ormCategoryRepository: Repository<Category>;

  let categoryRepository: ICategoryRepository;

  beforeAll(async () => {
    ormCategoryRepository = dataSource.getRepository(Category);

    categoryRepository = new CategoryRepository();
  });

  afterEach(async () => {
    await ormCategoryRepository.delete({});
  });

  it('Should be able to create a category', async () => {
    const name = 'test';

    const category = await categoryRepository.create(name);

    expect(category).toBeInstanceOf(Category);
    expect(category).toHaveProperty('id');
    expect(category.name).toEqual(name);
  });

  it('Should be able to delete category', async () => {
    const name = 'test 1';

    const category = ormCategoryRepository.create({ name });

    await ormCategoryRepository.save(category);

    await categoryRepository.delete(category);

    const foundCategory = await categoryRepository.findById(category.id);

    expect(foundCategory).toBeNull();
  });

  it('Should be able to find by ID', async () => {
    const name = 'test 2';

    const category = ormCategoryRepository.create({ name });

    await ormCategoryRepository.save(category);

    const foundCategory = await categoryRepository.findById(category.id);

    expect(foundCategory).toBeInstanceOf(Category);
    expect(foundCategory.id).toEqual(category.id);
  });

  it('Should be able to find all with filter name', async () => {
    const name = 'test 3';

    const category = ormCategoryRepository.create({ name });

    await ormCategoryRepository.save(category);

    const foundCategories = await categoryRepository.findAll(category.name);

    expect(foundCategories).toHaveLength(1);
    expect(foundCategories[0]).toBeInstanceOf(Category);
    expect(foundCategories[0].id).toEqual(category.id);
  });

  it('Should be able to find all', async () => {
    const name = 'test 4';

    const category = ormCategoryRepository.create({ name });

    await ormCategoryRepository.save(category);

    const foundCategories = await categoryRepository.findAll();

    expect(foundCategories).toHaveLength(1);
    expect(foundCategories[0]).toBeInstanceOf(Category);
    expect(foundCategories[0].id).toEqual(category.id);
  });
});
