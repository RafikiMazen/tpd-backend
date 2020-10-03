const express = require('express')
const router = express.Router()

const {
  getAllResourceRequests,
  addResourceRequest,
  deleteResourceRequest,
  getResourceRequest,
  addResourceRequestِAction,
  updateResourceRequest,
  updateResourceRequestAction,
  getResourceRequestActions,
  exportAllResourceRequests,
  addResourceRequestSkill,
  deleteResourceRequestSkill,
  managerExportAllResourceRequests,
  managerGetAllResourceRequests,
} = require('../services/resource_requests.service')

const {
  validateGetAllResourceRequests,
  validateAddResourceRequest,
  validateUpdateResourceRequest,
  validateDeleteResourceRequest,
  validateGetResourceRequest,
  validateGetResourceRequestActions,
  validateUpdateResourceRequestActions,
  validateAddResourceRequestActions,
  validateExportAllResourceRequests,
  validateAddResourceRequestSkill,
  validateDeleteResourceRequestSkill,
} = require('../middlewares/validations/resource_request.validations')
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
  validateGetAllResourceRequests,
  getAllResourceRequests
)
router.post(
  '/',
  verifyTPDorManager,
  validateAddResourceRequest,
  addResourceRequest
)
router.post(
  '/exportAll',
  verifyTPDorManager,
  validateExportAllResourceRequests,
  exportAllResourceRequests
)
router.post(
  '/skill',
  verifyTPDorManager,
  validateAddResourceRequestSkill,
  addResourceRequestSkill
)
router.delete(
  '/skill',
  verifyTPDorManager,
  validateDeleteResourceRequestSkill,
  deleteResourceRequestSkill
)

router.delete(
  '/',
  verifyTPDorManager,
  validateDeleteResourceRequest,
  deleteResourceRequest
)
router.put(
  '/',
  verifyTPDorManager,
  validateUpdateResourceRequest,
  updateResourceRequest
)
router.post(
  '/one',
  verifyTPDorManager,
  validateGetResourceRequest,
  getResourceRequest
)
router.post(
  '/action/all',
  verifyTPDorManager,
  validateGetResourceRequestActions,
  getResourceRequestActions
)
router.post(
  '/action',
  verifyTPDorManager,
  validateAddResourceRequestActions,
  addResourceRequestِAction
)
router.put(
  '/action',
  verifyTPDorManager,
  validateUpdateResourceRequestActions,
  updateResourceRequestAction
)

router.post(
  '/manager/getAll',
  verifyManager,
  validateGetAllResourceRequests,
  managerGetAllResourceRequests
)
router.post(
  '/manager/exportAll',
  verifyManager,
  validateExportAllResourceRequests,
  managerExportAllResourceRequests
)
module.exports = router
