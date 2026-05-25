const express=require('express');
const router=express.Router();
const userController=require('../controllers/userController');

router.get('/',userController.getUsers);
router.get('/add',userController.addUserForm);
router.post('/add',userController.createUser);
router.get('/edit/:id',userController.editUserForm);
router.put('/edit/:id',userController.updateUser);
router.delete('/delete/:id',userController.deleteUser);

module.exports=router;