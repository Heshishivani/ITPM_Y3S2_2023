import express from 'express'
import itemController from '../controllers/itemController.js'

const router = express.Router()

router.route('/').get(itemController.getItems)
router.route('/').post(itemController.saveItem)
router.route('/:id').get(itemController.getItemByID)
router.route('/:id').put(itemController.updateItem)
router.route('/:id').delete(itemController.deleteItem)

export default router