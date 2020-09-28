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
  exportAllReleaseRequests,
} = require('../services/release_requests.service')

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
  validateExportAllReleaseRequests,
} = require('../middlewares/validations/release_request.validations')
const {
  verifyToken,
  verifyEmployee,
  verifyManager,
  verifyTPD,
  verifyTPDorManager,
} = require('../auth/verifyToken')

router.post('/all', validateGetAllReleaseRequests, getAllReleaseRequests)
router.post(
  '/exportAll',
  validateExportAllReleaseRequests,
  exportAllReleaseRequests
)
router.post('/one', validateGetReleaseRequest, getReleaseRequest)
router.post('/', validateAddReleaseRequest, addReleaseRequest)
router.delete('/', validateDeleteReleaseRequest, deleteReleaseRequest)
router.put('/', validateUpdateReleaseRequest, updateReleaseRequest)

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
