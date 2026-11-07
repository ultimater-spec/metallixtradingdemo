import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  Category,
  Brand,
  Project,
  Enquiry,
  EnquiryStatus,
  HomepageSettings,
  CompanySettings,
} from '../types';
import { products as initialProducts } from '../data/products';
import { categories as initialCategories } from '../data/categories';
import { brands as initialBrands } from '../data/brands';
import { projects as initialProjects } from '../data/projects';
import {
  defaultHomepageSettings,
  defaultCompanySettings,
  defaultEnquiries,
} from '../data/defaults';
import {
  STORAGE_KEYS,
  loadFromStorage,
  saveToStorage,
  clearAllDemoStorage,
} from '../utils/storage';

interface WebsiteDataContextType {
  // Products
  products: Product[];
  publishedProducts: Product[];
  addProduct: (product: Omit<Product, 'id'> & { id?: string }) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleProductPublish: (id: string) => void;
  toggleProductFeatured: (id: string) => void;

  // Categories
  categories: Category[];
  publishedCategories: Category[];
  addCategory: (category: Omit<Category, 'id'> & { id?: string }) => Category;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => { success: boolean; error?: string };
  toggleCategoryPublish: (id: string) => void;

  // Brands
  brands: Brand[];
  publishedBrands: Brand[];
  addBrand: (brand: Omit<Brand, 'id'> & { id?: string }) => Brand;
  updateBrand: (id: string, updates: Partial<Brand>) => void;
  deleteBrand: (id: string) => void;
  toggleBrandPublish: (id: string) => void;

  // Projects
  projects: Project[];
  publishedProjects: Project[];
  addProject: (project: Omit<Project, 'id'> & { id?: string }) => Project;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  toggleProjectPublish: (id: string) => void;

  // Enquiries
  enquiries: Enquiry[];
  addEnquiry: (data: {
    customerName: string;
    company: string;
    email: string;
    phone: string;
    productName: string;
    productId?: string;
    quantity?: string;
    message?: string;
  }) => Enquiry;
  updateEnquiryStatus: (id: string, status: EnquiryStatus) => void;
  deleteEnquiry: (id: string) => void;

  // Settings
  homepageSettings: HomepageSettings;
  updateHomepageSettings: (settings: Partial<HomepageSettings>) => void;

  companySettings: CompanySettings;
  updateCompanySettings: (settings: Partial<CompanySettings>) => void;

  // Reset
  resetAllDemoData: () => void;
}

const WebsiteDataContext = createContext<WebsiteDataContextType | undefined>(undefined);

// Ensure all seed data items have default published status
const seededProducts: Product[] = initialProducts.map((p) => ({
  ...p,
  isPublished: p.isPublished ?? true,
}));

const seededCategories: Category[] = initialCategories.map((c) => ({
  ...c,
  isPublished: c.isPublished ?? true,
}));

const seededBrands: Brand[] = initialBrands.map((b) => ({
  ...b,
  isPublished: b.isPublished ?? true,
}));

const seededProjects: Project[] = initialProjects.map((pj) => ({
  ...pj,
  isPublished: pj.isPublished ?? true,
}));

export const WebsiteDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State initialization with localStorage fallback
  const [products, setProducts] = useState<Product[]>(() =>
    loadFromStorage<Product[]>(STORAGE_KEYS.PRODUCTS, seededProducts)
  );
  const [categories, setCategories] = useState<Category[]>(() =>
    loadFromStorage<Category[]>(STORAGE_KEYS.CATEGORIES, seededCategories)
  );
  const [brands, setBrands] = useState<Brand[]>(() =>
    loadFromStorage<Brand[]>(STORAGE_KEYS.BRANDS, seededBrands)
  );
  const [projects, setProjects] = useState<Project[]>(() =>
    loadFromStorage<Project[]>(STORAGE_KEYS.PROJECTS, seededProjects)
  );
  const [enquiries, setEnquiries] = useState<Enquiry[]>(() =>
    loadFromStorage<Enquiry[]>(STORAGE_KEYS.ENQUIRIES, defaultEnquiries)
  );
  const [homepageSettings, setHomepageSettings] = useState<HomepageSettings>(() =>
    loadFromStorage<HomepageSettings>(STORAGE_KEYS.HOMEPAGE, defaultHomepageSettings)
  );
  const [companySettings, setCompanySettings] = useState<CompanySettings>(() =>
    loadFromStorage<CompanySettings>(STORAGE_KEYS.COMPANY, defaultCompanySettings)
  );

  // Sync to localStorage
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.PRODUCTS, products);
  }, [products]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.CATEGORIES, categories);
  }, [categories]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.BRANDS, brands);
  }, [brands]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.PROJECTS, projects);
  }, [projects]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.ENQUIRIES, enquiries);
  }, [enquiries]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.HOMEPAGE, homepageSettings);
  }, [homepageSettings]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.COMPANY, companySettings);
  }, [companySettings]);

  // Derived published slices for public views
  const publishedProducts = products.filter((p) => p.isPublished !== false);
  const publishedCategories = categories.filter((c) => c.isPublished !== false);
  const publishedBrands = brands.filter((b) => b.isPublished !== false);
  const publishedProjects = projects.filter((pj) => pj.isPublished !== false);

  // PRODUCT ACTIONS
  const addProduct = (item: Omit<Product, 'id'> & { id?: string }): Product => {
    const newId = item.id || `DEMO-PRD-${Date.now().toString().slice(-4)}`;
    const newProduct: Product = {
      ...item,
      id: newId,
      isPublished: item.isPublished ?? true,
      availability: item.availability || 'Enquiry required',
      specifications: item.specifications || {},
    };
    setProducts((prev) => [newProduct, ...prev]);

    // Update productCount in the relevant category
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === newProduct.categoryId
          ? { ...cat, productCount: cat.productCount + 1 }
          : cat
      )
    );

    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const deleteProduct = (id: string) => {
    const target = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    if (target) {
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === target.categoryId
            ? { ...cat, productCount: Math.max(0, cat.productCount - 1) }
            : cat
        )
      );
    }
  };

  const toggleProductPublish = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isPublished: !p.isPublished } : p))
    );
  };

  const toggleProductFeatured = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFeatured: !p.isFeatured } : p))
    );
  };

  // CATEGORY ACTIONS
  const addCategory = (cat: Omit<Category, 'id'> & { id?: string }): Category => {
    const slug = cat.slug || cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newCategory: Category = {
      ...cat,
      id: cat.id || slug,
      slug,
      productCount: cat.productCount || 0,
      isPublished: cat.isPublished ?? true,
    };
    setCategories((prev) => [...prev, newCategory]);
    return newCategory;
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
    // If category name updated, also sync categoryName across assigned products
    if (updates.name) {
      setProducts((prev) =>
        prev.map((p) =>
          p.categoryId === id ? { ...p, categoryName: updates.name! } : p
        )
      );
    }
  };

  const deleteCategory = (id: string): { success: boolean; error?: string } => {
    // Check if products still reference this category
    const count = products.filter((p) => p.categoryId === id).length;
    if (count > 0) {
      return {
        success: false,
        error: `Cannot delete category "${id}". It currently contains ${count} product${count > 1 ? 's' : ''}. Reassign or delete those products first.`,
      };
    }

    setCategories((prev) => prev.filter((c) => c.id !== id));
    return { success: true };
  };

  const toggleCategoryPublish = (id: string) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isPublished: !c.isPublished } : c))
    );
  };

  // BRAND ACTIONS
  const addBrand = (b: Omit<Brand, 'id'> & { id?: string }): Brand => {
    const newId = b.id || `demo-brand-${Date.now().toString().slice(-4)}`;
    const newBrand: Brand = {
      ...b,
      id: newId,
      isPublished: b.isPublished ?? true,
      isDemoPlaceholder: true,
    };
    setBrands((prev) => [newBrand, ...prev]);
    return newBrand;
  };

  const updateBrand = (id: string, updates: Partial<Brand>) => {
    setBrands((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const deleteBrand = (id: string) => {
    setBrands((prev) => prev.filter((b) => b.id !== id));
  };

  const toggleBrandPublish = (id: string) => {
    setBrands((prev) =>
      prev.map((b) => (b.id === id ? { ...b, isPublished: !b.isPublished } : b))
    );
  };

  // PROJECT ACTIONS
  const addProject = (proj: Omit<Project, 'id'> & { id?: string }): Project => {
    const newId = proj.id || `proj-${Date.now().toString().slice(-4)}`;
    const newProject: Project = {
      ...proj,
      id: newId,
      isPublished: proj.isPublished ?? true,
      isDemoVisual: true,
    };
    setProjects((prev) => [newProject, ...prev]);
    return newProject;
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((pj) => pj.id !== id));
  };

  const toggleProjectPublish = (id: string) => {
    setProjects((prev) =>
      prev.map((pj) => (pj.id === id ? { ...pj, isPublished: !pj.isPublished } : pj))
    );
  };

  // ENQUIRY ACTIONS
  const addEnquiry = (data: {
    customerName: string;
    company: string;
    email: string;
    phone: string;
    productName: string;
    productId?: string;
    quantity?: string;
    message?: string;
  }): Enquiry => {
    const newEnquiry: Enquiry = {
      id: `RFQ-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      customerName: data.customerName,
      company: data.company,
      email: data.email,
      phone: data.phone,
      productName: data.productName,
      productId: data.productId,
      quantity: data.quantity || 'Quote requested',
      message: data.message,
      status: 'New',
      date: new Date().toISOString().split('T')[0],
    };
    setEnquiries((prev) => [newEnquiry, ...prev]);
    return newEnquiry;
  };

  const updateEnquiryStatus = (id: string, status: EnquiryStatus) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status } : e))
    );
  };

  const deleteEnquiry = (id: string) => {
    setEnquiries((prev) => prev.filter((e) => e.id !== id));
  };

  // SETTINGS ACTIONS
  const updateHomepageSettings = (updates: Partial<HomepageSettings>) => {
    setHomepageSettings((prev) => ({ ...prev, ...updates }));
  };

  const updateCompanySettings = (updates: Partial<CompanySettings>) => {
    setCompanySettings((prev) => ({ ...prev, ...updates }));
  };

  // RESET
  const resetAllDemoData = () => {
    clearAllDemoStorage();
    setProducts(seededProducts);
    setCategories(seededCategories);
    setBrands(seededBrands);
    setProjects(seededProjects);
    setEnquiries(defaultEnquiries);
    setHomepageSettings(defaultHomepageSettings);
    setCompanySettings(defaultCompanySettings);
  };

  return (
    <WebsiteDataContext.Provider
      value={{
        products,
        publishedProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductPublish,
        toggleProductFeatured,

        categories,
        publishedCategories,
        addCategory,
        updateCategory,
        deleteCategory,
        toggleCategoryPublish,

        brands,
        publishedBrands,
        addBrand,
        updateBrand,
        deleteBrand,
        toggleBrandPublish,

        projects,
        publishedProjects,
        addProject,
        updateProject,
        deleteProject,
        toggleProjectPublish,

        enquiries,
        addEnquiry,
        updateEnquiryStatus,
        deleteEnquiry,

        homepageSettings,
        updateHomepageSettings,

        companySettings,
        updateCompanySettings,

        resetAllDemoData,
      }}
    >
      {children}
    </WebsiteDataContext.Provider>
  );
};

export const useWebsiteData = () => {
  const ctx = useContext(WebsiteDataContext);
  if (!ctx) {
    throw new Error('useWebsiteData must be used within a WebsiteDataProvider');
  }
  return ctx;
};

export default WebsiteDataContext;

