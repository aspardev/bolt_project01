import { Product, ProductFilters } from '../types/product';

class ProductService {
  private baseUrl = '/api/products';

  // Mock data for demo purposes
  private mockProducts: Product[] = [
    {
      id: '1',
      name: 'Premium Kahve Makinesi',
      description: 'Otomatik espresso makinesi, 15 bar basınç',
      price: 2499.99,
      originalPrice: 2999.99,
      category: 'electronics',
      subcategory: 'kitchen-appliances',
      images: ['https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=500'],
      stock: 15,
      sku: 'CM-001',
      status: 'active',
      tags: ['kahve', 'makine', 'espresso'],
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-20T14:45:00Z'
    },
    {
      id: '2',
      name: 'Drahtlos Bluetooth Kopfhörer',
      description: 'Noise-cancelling teknolojisi ile premium ses kalitesi',
      price: 899.99,
      category: 'electronics',
      subcategory: 'audio',
      images: ['https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500'],
      stock: 32,
      sku: 'BT-002',
      status: 'active',
      tags: ['bluetooth', 'kulaklık', 'ses'],
      createdAt: '2024-01-10T09:15:00Z',
      updatedAt: '2024-01-18T16:20:00Z'
    },
    {
      id: '3',
      name: 'Organik Yeşil Çay',
      description: 'Ceylon\'dan ithal organik yeşil çay, 100gr',
      price: 45.50,
      category: 'food-beverage',
      subcategory: 'tea',
      images: ['https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=500'],
      stock: 120,
      sku: 'GT-003',
      status: 'active',
      tags: ['organik', 'çay', 'yeşil'],
      createdAt: '2024-01-05T11:00:00Z',
      updatedAt: '2024-01-15T13:30:00Z'
    }
  ];

  async getProducts(filters: ProductFilters = {}, page = 1, limit = 10) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    let filteredProducts = [...this.mockProducts];

    // Apply filters
    if (filters.category) {
      filteredProducts = filteredProducts.filter(p => p.category === filters.category);
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    if (filters.status) {
      filteredProducts = filteredProducts.filter(p => p.status === filters.status);
    }

    // Apply sorting
    if (filters.sortBy) {
      filteredProducts.sort((a, b) => {
        let aValue = a[filters.sortBy!];
        let bValue = b[filters.sortBy!];

        if (filters.sortBy === 'createdAt' || filters.sortBy === 'updatedAt') {
          aValue = new Date(aValue as string).getTime();
          bValue = new Date(bValue as string).getTime();
        }

        if (filters.sortOrder === 'desc') {
          return bValue > aValue ? 1 : -1;
        }
        return aValue > bValue ? 1 : -1;
      });
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return {
      products: paginatedProducts,
      totalCount: filteredProducts.length,
      page,
      limit,
      totalPages: Math.ceil(filteredProducts.length / limit)
    };
  }

  async getProductById(id: string) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.mockProducts.find(p => p.id === id) || null;
  }

  async createProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.mockProducts.unshift(newProduct);
    return newProduct;
  }

  async updateProduct(id: string, updates: Partial<Product>) {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const productIndex = this.mockProducts.findIndex(p => p.id === id);
    if (productIndex === -1) throw new Error('Ürün bulunamadı');

    this.mockProducts[productIndex] = {
      ...this.mockProducts[productIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    return this.mockProducts[productIndex];
  }

  async deleteProduct(id: string) {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const productIndex = this.mockProducts.findIndex(p => p.id === id);
    if (productIndex === -1) throw new Error('Ürün bulunamadı');

    this.mockProducts.splice(productIndex, 1);
    return true;
  }
}

export const productService = new ProductService();