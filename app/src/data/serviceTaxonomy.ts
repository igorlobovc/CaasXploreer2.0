import categoryDictionaryRaw from '../../../data/reference/category_dictionary/categories.json';
import subcategoryDictionaryRaw from '../../../data/reference/subcategory_dictionary/subcategories.json';

type RawCategoryDictionary = Record<
  string,
  {
    count: number;
    subcategories: Array<{
      name: string;
      count: number;
    }>;
  }
>;

type RawSubcategoryDictionary = Record<
  string,
  {
    count: number;
    categories: Array<{
      name: string;
      count: number;
    }>;
  }
>;

export type ServiceTaxonomySubcategory = {
  name: string;
  total: number;
};

export type ServiceTaxonomyCategory = {
  categoria: string;
  total: number;
  subcategoryTotal: number;
  subcategories: ServiceTaxonomySubcategory[];
};

const categoryDictionary = categoryDictionaryRaw as RawCategoryDictionary;
const subcategoryDictionary = subcategoryDictionaryRaw as RawSubcategoryDictionary;

const subcategoryCountByCategory = Object.values(subcategoryDictionary).reduce<Record<string, number>>(
  (acc, subcategory) => {
    for (const category of subcategory.categories) {
      acc[category.name] = (acc[category.name] ?? 0) + 1;
    }
    return acc;
  },
  {},
);

export const SERVICE_TAXONOMY: ServiceTaxonomyCategory[] = Object.entries(categoryDictionary)
  .map(([categoria, payload]) => ({
    categoria,
    total: payload.count,
    subcategoryTotal: subcategoryCountByCategory[categoria] ?? payload.subcategories.length,
    subcategories: [...payload.subcategories]
      .sort((a, b) => b.count - a.count)
      .map((subcategory) => ({
        name: subcategory.name,
        total: subcategory.count,
      })),
  }))
  .sort((a, b) => b.total - a.total);

export const SERVICE_TAXONOMY_TOTAL = SERVICE_TAXONOMY.reduce((acc, category) => acc + category.total, 0);
export const SERVICE_TAXONOMY_SUBCATEGORY_TOTAL = SERVICE_TAXONOMY.reduce(
  (acc, category) => acc + category.subcategoryTotal,
  0,
);

