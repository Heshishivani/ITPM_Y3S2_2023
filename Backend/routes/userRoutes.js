import express from 'express'
import userController from '../controllers/userController.js'

const router = express.Router()

//user routes
router.route('/').get(userController.getUsers)
router.route('/register').post(userController.createUser)
router.route('/login').post(userController.authUser)
router.route('/profile/auth').post(userController.checkTokenExpiration)
router.route('/edit/:id').put(userController.updateCustomerData)
router.route('/delete/:id').delete(userController.deleteUser)
router.route('/view/:id').get(userController.getUserByID)


export default router