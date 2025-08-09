import { Category } from '../types/product';

class CategoryService {
  private mockCategories: Category[] = [
    {
      id: '1',
      name: 'Elektronik',
      slug: 'electronics',
      description: 'Teknoloji ürünleri ve elektronik cihazlar',
      productCount: 125
    },
    {
      id: '2',
      name: 'Gıda & İçecek',
      slug: 'food-beverage',
      description: 'Yiyecek ve içecek ürünleri',
      productCount: 89
    },
    {
      id: '3',
      name: 'Moda & Giyim',
      slug: 'fashion',
      description: 'Giyim, ayakkabı ve aksesuar',
      productCount: 234
    },
    {
      id: '4',
      name: 'Ev & Yaşam',
      slug: 'home-living',
      description: 'Ev dekorasyonu ve yaşam ürünleri',
      productCount: 156
    }
  ];

  async getCategories() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.mockCategories;
  }

  async getCategoryById(id: string) {
    await new Promise(resolve => setTimeout(resolve, 200));
    return this.mockCategories.find(c => c.id === id) || null;
  }
}

export const categoryService = new CategoryService();