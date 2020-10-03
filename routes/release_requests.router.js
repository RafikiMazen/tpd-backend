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
  managerExportAllReleaseRequests,
  managerGetAllReleaseRequests,
} = require('../services/release_requests.service')

const {
  validateGetAllReleaseRequests,
  validateAddReleaseRequest,
  validateUpdateReleaseRequest,
  validateDeleteReleaseRequest,
  validateGetReleaseRequest,
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

router.post(
  '/all',
  verifyTPDorManager,
  validateGetAllReleaseRequests,
  getAllReleaseRequests
)
router.post(
  '/exportAll',
  verifyTPDorManager,
  validateExportAllReleaseRequests,
  exportAllReleaseRequests
)
router.post(
  '/one',
  verifyTPDorManager,
  validateGetReleaseRequest,
  getReleaseRequest
)
router.post(
  '/',
  verifyTPDorManager,
  validateAddReleaseRequest,
  addReleaseRequest
)
router.delete(
  '/',
  verifyTPDorManager,
  validateDeleteReleaseRequest,
  deleteReleaseRequest
)
router.put(
  '/',
  verifyTPDorManager,
  validateUpdateReleaseRequest,
  updateReleaseRequest
)

router.get(
  '/action/',
  verifyTPDorManager,
  getReleaseRequestActions
)
router.post(
  '/action',
  verifyTPDorManager,
  validateAddReleaseRequestActions,
  addReleaseRequestِAction
)
router.put(
  '/action',
  verifyTPDorManager,
  validateUpdateReleaseRequestActions,
  updateReleaseRequestAction
)

router.post(
  '/manager/getAll',
  verifyTPDorManager,
  validateGetAllReleaseRequests,
  managerGetAllReleaseRequests
)
router.post(
  '/manager/exportAll',
  verifyTPDorManager,
  validateExportAllReleaseRequests,
  managerExportAllReleaseRequests
)

module.exports = router
