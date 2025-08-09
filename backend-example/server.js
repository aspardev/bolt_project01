// Node.js + Express Backend Example
// This file shows the backend structure but won't run in WebContainer

const express = require('express');
const cors = require('cors');
const redis = require('redis');
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');

const app = express();
const port = process.env.PORT || 3001;

// Redis client setup
const redisClient = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Middleware
app.use(cors());
app.use(express.json());

// File upload setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Mock database (replace with actual database)
let products = [];
let categories = [];

// Helper function for cache
const getCachedData = async (key) => {
  try {
    const cached = await redisClient.get(key);
    return cached ? JSON.parse(cached) : null;
  } catch (error) {
    console.error('Redis error:', error);
    return null;
  }
};

const setCachedData = async (key, data, expiry = 3600) => {
  try {
    await redisClient.setex(key, expiry, JSON.stringify(data));
  } catch (error) {
    console.error('Redis error:', error);
  }
};

// Product CRUD Endpoints

// GET /api/products - List products with filtering and pagination
app.get('/api/products', async (req, res) => {
  try {
    const {
      category,
      search,
      status,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 12
    } = req.query;

    const cacheKey = `products:${JSON.stringify(req.query)}`;
    
    // Check cache first
    let cachedResult = await getCachedData(cacheKey);
    if (cachedResult) {
      return res.json(cachedResult);
    }

    // Filter products
    let filteredProducts = [...products];

    if (category) {
      filteredProducts = filteredProducts.filter(p => p.category === category);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredProducts = filteredProducts.filter(p =>
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    if (status) {
      filteredProducts = filteredProducts.filter(p => p.status === status);
    }

    // Sort products
    filteredProducts.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === 'createdAt' || sortBy === 'updatedAt') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (sortOrder === 'desc') {
        return bValue > aValue ? 1 : -1;
      }
      return aValue > bValue ? 1 : -1;
    });

    // Pagination
    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const endIndex = startIndex + parseInt(limit);
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    const result = {
      products: paginatedProducts,
      totalCount: filteredProducts.length,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(filteredProducts.length / parseInt(limit))
    };

    // Cache the result
    await setCachedData(cacheKey, result, 600); // Cache for 10 minutes

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/products/:id - Get single product
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const cacheKey = `product:${id}`;

    // Check cache first
    let cachedProduct = await getCachedData(cacheKey);
    if (cachedProduct) {
      return res.json(cachedProduct);
    }

    const product = products.find(p => p.id === id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Cache the product
    await setCachedData(cacheKey, product);

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/products - Create new product
app.post('/api/products', async (req, res) => {
  try {
    const productData = req.body;
    
    const newProduct = {
      id: Date.now().toString(),
      ...productData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    products.unshift(newProduct);

    // Clear relevant caches
    const keys = await redisClient.keys('products:*');
    if (keys.length > 0) {
      await redisClient.del(keys);
    }

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/products/:id - Update product
app.put('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const productIndex = products.findIndex(p => p.id === id);
    if (productIndex === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }

    products[productIndex] = {
      ...products[productIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    // Clear caches
    await redisClient.del(`product:${id}`);
    const keys = await redisClient.keys('products:*');
    if (keys.length > 0) {
      await redisClient.del(keys);
    }

    res.json(products[productIndex]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/products/:id - Delete product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const productIndex = products.findIndex(p => p.id === id);
    if (productIndex === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }

    products.splice(productIndex, 1);

    // Clear caches
    await redisClient.del(`product:${id}`);
    const keys = await redisClient.keys('products:*');
    if (keys.length > 0) {
      await redisClient.del(keys);
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/upload - Upload image to Cloudinary
app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'image',
          folder: 'products'
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(req.file.buffer);
    });

    res.json({
      secure_url: result.secure_url,
      public_id: result.public_id,
      resource_type: result.resource_type,
      width: result.width,
      height: result.height
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/categories - Get all categories
app.get('/api/categories', async (req, res) => {
  try {
    const cacheKey = 'categories';
    
    let cachedCategories = await getCachedData(cacheKey);
    if (cachedCategories) {
      return res.json(cachedCategories);
    }

    // Cache categories
    await setCachedData(cacheKey, categories, 3600); // Cache for 1 hour

    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Initialize Redis connection
const startServer = async () => {
  try {
    await redisClient.connect();
    console.log('Redis connected successfully');
    
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

startServer();

module.exports = app;