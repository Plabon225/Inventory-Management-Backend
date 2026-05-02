import express from 'express';
import * as UserController from '../controller/users/usersController.js';
import * as BrandController from '../controller/brands/brandsController.js';
import * as CategoriesController from '../controller/categories/categoriesController.js';
import * as CustomersController from '../controller/customers/customersController.js';
import * as SuppliersController from '../controller/suppliers/suppliersController.js';
import * as ExpenseTypesController from '../controller/expenses/expnseTypesController.js';
import * as ExpenseController from '../controller/expenses/expenseController.js';
import * as ProductsController from '../controller/products/productsController.js';
import * as PurchaseController from '../controller/purchase/purchaseController.js';
import * as SalesController from '../controller/sales/salesController.js';
import * as SalesReturnController from '../controller/returns/salesReturnsController.js';
import AuthVerifyMiddleware from "../middlewares/AuthVerifyMiddleware.js";

const router = express.Router();

// user profile
router.post('/registration', UserController.registration );
router.post('/login', UserController.login );
router.post('/profileUpdate',AuthVerifyMiddleware, UserController.profileUpdate);
router.get('/profileDetails',AuthVerifyMiddleware, UserController.profileDetails);
router.post('/verifyEmail/:email', UserController.verifyEmail);
router.post('/verifyOTP/:email/:otp', UserController.verifyOTP);
router.post('/resetPass', UserController.resetPassword);

// brands
router.post("/createBrand",AuthVerifyMiddleware,BrandController.CreateBrand);
router.post("/updateBrand/:id",AuthVerifyMiddleware,BrandController.UpdateBrand);
router.get("/brandList",AuthVerifyMiddleware,BrandController.BrandList);
router.get("/brandDropDown",AuthVerifyMiddleware,BrandController.BrandDropDown);
router.delete("/deleteBrand/:id",AuthVerifyMiddleware,BrandController.DeleteBrand);
router.get("/brandDetailsByID/:id",AuthVerifyMiddleware,BrandController.BrandDetailsByID);

// categories
router.post("/createCategory",AuthVerifyMiddleware,CategoriesController.CreateCategory);
router.post("/updateCategory/:id",AuthVerifyMiddleware,CategoriesController.UpdateCategory);
router.get("/categoryList",AuthVerifyMiddleware,CategoriesController.CategoryList);
router.get("/categoryDropDown",AuthVerifyMiddleware,CategoriesController.CategoryDropDown);
router.delete("/deleteCategory/:id",AuthVerifyMiddleware,CategoriesController.DeleteCategory);
router.get("/categoryDetailsByID/:id",AuthVerifyMiddleware,CategoriesController.CategoryDetailsByID);

// customers
router.post("/createCustomers",AuthVerifyMiddleware,CustomersController.CreateCustomers);
router.post("/updateCustomers/:id",AuthVerifyMiddleware,CustomersController.UpdateCustomers);
router.get("/customersList",AuthVerifyMiddleware,CustomersController.CustomersList);
router.get("/customersDropDown",AuthVerifyMiddleware,CustomersController.CustomersDropDown);
router.delete("/deleteCustomer/:id",AuthVerifyMiddleware,CustomersController.DeleteCustomer);
router.get("/customerDetailsByID/:id",AuthVerifyMiddleware,CustomersController.CustomerDetailsByID);

// suppliers
router.post("/createSuppliers",AuthVerifyMiddleware,SuppliersController.CreateSuppliers);
router.post("/updateSuppliers/:id",AuthVerifyMiddleware,SuppliersController.UpdateSuppliers);
router.get("/suppliersList",AuthVerifyMiddleware,SuppliersController.SuppliersList);
router.get("/suppliersDropDown",AuthVerifyMiddleware,SuppliersController.SuppliersDropDown);
router.delete("/deleteSupplier/:id",AuthVerifyMiddleware,SuppliersController.DeleteSupplier);
router.get("/supplierDetailsByID/:id",AuthVerifyMiddleware,SuppliersController.SupplierDetailsByID);

// expenseTypes
router.post("/createExpenseTypes",AuthVerifyMiddleware,ExpenseTypesController.CreateExpenseTypes);
router.post("/updateExpenseTypes/:id",AuthVerifyMiddleware,ExpenseTypesController.UpdateExpenseTypes);
router.get("/expenseTypesList",AuthVerifyMiddleware,ExpenseTypesController.ExpenseTypesList);
router.get("/expenseTypesDropDown",AuthVerifyMiddleware,ExpenseTypesController.ExpenseTypesDropDown);
router.get("/ExpenseTypesDetailsByID/:id",AuthVerifyMiddleware,ExpenseTypesController.ExpenseTypesDetailsByID);

// expense
router.post("/createExpense",AuthVerifyMiddleware,ExpenseController.CreateExpense);
router.post("/updateExpense/:id",AuthVerifyMiddleware,ExpenseController.UpdateExpense);
router.get("/expenseList",AuthVerifyMiddleware,ExpenseController.ExpenseList);
router.delete("/deleteExpense/:id",AuthVerifyMiddleware,ExpenseController.DeleteExpense);
router.get("/expenseReport",AuthVerifyMiddleware,ExpenseController.ExpenseReport);
router.get("/expenseSummary",AuthVerifyMiddleware,ExpenseController.ExpenseSummary);
router.get("/expenseDetailsByID/:id",AuthVerifyMiddleware,ExpenseController.ExpenseDetailsByID);

// products
router.post("/createProducts",AuthVerifyMiddleware,ProductsController.CreateProducts);
router.post("/updateProducts/:id",AuthVerifyMiddleware,ProductsController.UpdateProducts);
router.get("/productList",AuthVerifyMiddleware,ProductsController.ProductList);
router.delete("/deleteProduct/:id",AuthVerifyMiddleware,ProductsController.DeleteProduct);
router.get("/productDetailsByID/:id",AuthVerifyMiddleware,ProductsController.ProductDetailsByID);

// purchase
router.post("/createPurchase",AuthVerifyMiddleware,PurchaseController.CreatePurchase);
router.get("/purchaseList",AuthVerifyMiddleware,PurchaseController.PurchaseList);
router.delete("/deletePurchase/:id",AuthVerifyMiddleware,PurchaseController.DeletePurchase);
router.get("/purchaseReport",AuthVerifyMiddleware,PurchaseController.PurchaseReport);
router.get("/purchaseSummary",AuthVerifyMiddleware,PurchaseController.PurchaseSummary);

// sales
router.post("/createSales",AuthVerifyMiddleware,SalesController.CreateSales);
router.get("/salesList",AuthVerifyMiddleware,SalesController.salesList);
router.delete("/deleteSales/:id",AuthVerifyMiddleware,SalesController.DeleteSales);
router.get("/salesReport",AuthVerifyMiddleware,SalesController.SalesReport);
router.get("/SalesSummary",AuthVerifyMiddleware,SalesController.SalesSummary);

// salesReturn
router.post("/createSalesReturn",AuthVerifyMiddleware,SalesReturnController.CreateSalesReturn);
router.get("/salesReturnList",AuthVerifyMiddleware,SalesReturnController.SalesReturnList);
router.delete("/deleteSalesReturn/:id",AuthVerifyMiddleware,SalesReturnController.DeleteSalesReturn);
router.get("/salesReturnReport",AuthVerifyMiddleware,SalesReturnController.SalesReturnReport);
router.get("/salesReturnSummary",AuthVerifyMiddleware,SalesReturnController.SalesReturnSummary);


export default router;