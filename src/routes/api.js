import express from 'express';
import * as UserController from '../controller/usersController.js';
import * as BrandController from '../controller/brandsController.js';
import * as CategoriesController from '../controller/categoriesController.js';
import * as CustomersController from '../controller/customersController.js';
import * as SuppliersController from '../controller/suppliersController.js';
import * as ExpenseTypesController from '../controller/expenses/expnseTypesController.js';
import * as ExpenseController from '../controller/expenses/expenseController.js';
import * as ProductsController from '../controller/productsController.js';
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

// categories
router.post("/createCategory",AuthVerifyMiddleware,CategoriesController.CreateCategory);
router.post("/updateCategory/:id",AuthVerifyMiddleware,CategoriesController.UpdateCategory);
router.get("/categoryList",AuthVerifyMiddleware,CategoriesController.CategoryList);
router.get("/categoryDropDown",AuthVerifyMiddleware,CategoriesController.CategoryDropDown);

// customers
router.post("/createCustomers",AuthVerifyMiddleware,CustomersController.CreateCustomers);
router.post("/updateCustomers/:id",AuthVerifyMiddleware,CustomersController.UpdateCustomers);
router.get("/customersList",AuthVerifyMiddleware,CustomersController.CustomersList);
router.get("/customersDropDown",AuthVerifyMiddleware,CustomersController.CustomersDropDown);

// suppliers
router.post("/createSuppliers",AuthVerifyMiddleware,SuppliersController.CreateSuppliers);
router.post("/updateSuppliers/:id",AuthVerifyMiddleware,SuppliersController.UpdateSuppliers);
router.get("/suppliersList",AuthVerifyMiddleware,SuppliersController.SuppliersList);
router.get("/suppliersDropDown",AuthVerifyMiddleware,SuppliersController.SuppliersDropDown);

// expenseTypes
router.post("/createExpenseTypes",AuthVerifyMiddleware,ExpenseTypesController.CreateExpenseTypes);
router.post("/updateExpenseTypes/:id",AuthVerifyMiddleware,ExpenseTypesController.UpdateExpenseTypes);
router.get("/expenseTypesList",AuthVerifyMiddleware,ExpenseTypesController.ExpenseTypesList);
router.get("/expenseTypesDropDown",AuthVerifyMiddleware,ExpenseTypesController.ExpenseTypesDropDown);


// expense
router.post("/createExpense",AuthVerifyMiddleware,ExpenseController.CreateExpense);
router.post("/updateExpense/:id",AuthVerifyMiddleware,ExpenseController.UpdateExpense);
router.get("/expenseList",AuthVerifyMiddleware,ExpenseController.ExpenseList);


// products
router.post("/createProducts",AuthVerifyMiddleware,ProductsController.CreateProducts);
router.post("/updateProducts/:id",AuthVerifyMiddleware,ProductsController.UpdateProducts);
router.get("/productList",AuthVerifyMiddleware,ProductsController.ProductList);

export default router;