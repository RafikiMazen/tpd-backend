const express = require('express')
const router = express.Router()

const {
  getAllReleaseRequests,
  addReleaseRequest,
  deleteReleaseRequest,
  getReleaseRequest,
  addReleaseRequestِAction,
  updateReleaseRequest,
  updateReleaseRequestAction,
  getReleaseRequestActions,
} = require('../services/releaserequests.service')

const {
  validateGetAllReleaseRequests,
  validateAddReleaseRequest,
  validateUpdateReleaseRequest,
  validateDeleteReleaseRequest,
  validateGetReleaseRequest,
  validateGetReleaseRequestActions,
  validateDeleteReleaseRequestActions,
  validateUpdateReleaseRequestActions,
  validateAddReleaseRequestActions,
} = require('../middlewares/validations/releaserequest.validations')
// const {
//   verifyToken,
//   verifyAdmin,
//   verifySales,
//   verifyTech,
//   authorizeUser,
//   authorizeEdit,
// } = require('../auth/verifyToken')

router.get('/all', validateGetAllReleaseRequests, getAllReleaseRequests)
router.post('/', validateAddReleaseRequest, addReleaseRequest)
router.delete('/', validateDeleteReleaseRequest, deleteReleaseRequest)
router.put('/', validateUpdateReleaseRequest, updateReleaseRequest)
router.get('/', validateGetReleaseRequest, getReleaseRequest)
router.get(
  '/action/',
  validateGetReleaseRequestActions,
  getReleaseRequestActions
)
// router.delete(
//   '/action',
//   validateDeleteReleaseRequestActions,
//   deleteReleaseRequestAction
// )
router.post(
  '/action',
  validateAddReleaseRequestActions,
  addReleaseRequestِAction
)
router.put(
  '/action',
  validateUpdateReleaseRequestActions,
  updateReleaseRequestAction
)

module.exports = router
