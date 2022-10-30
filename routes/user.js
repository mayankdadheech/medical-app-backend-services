const express = require('express');
const router = express.Router();


const { createUser, userSignIn, signOut } = require('../controllers/userController');
    
const { getAllMedicines, addMedicines } = require('../controllers/medicineController');
const { isAuth } = require('../middlewares/auth');
const {
    validateUserSignUp,
    userValidation,
    validateUserSignIn,
  } = require('../middlewares/validation/userMiddlewareValidation');
const { proceedPayment, getActiveTransactions, getLastThreeTransactionDetails } = require('../controllers/transactionController');


router.post('/create-user', validateUserSignUp, userValidation, createUser);
router.post('/sign-in', validateUserSignIn, userValidation, userSignIn);
router.post('/medicines/add', isAuth, addMedicines);
router.get('/medicines/all', isAuth, getAllMedicines);
router.post('/payment', isAuth, proceedPayment);
router.post('/transactions/active', isAuth, getActiveTransactions);
router.post('/transactions/details', isAuth, getLastThreeTransactionDetails);
router.post('/sign-out', isAuth, signOut);

module.exports = router;