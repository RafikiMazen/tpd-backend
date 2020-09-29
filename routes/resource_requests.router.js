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
// const {
//   verifyToken,
//   verifyAdmin,
//   verifySales,
//   verifyTech,
//   authorizeUser,
//   authorizeEdit,
// } = require('../auth/verifyToken')

router.post('/all', validateGetAllResourceRequests, getAllResourceRequests)
router.post('/', validateAddResourceRequest, addResourceRequest)
router.post(
  '/exportAll',
  validateExportAllResourceRequests,
  exportAllResourceRequests
)
router.post('/skill', validateAddResourceRequestSkill, addResourceRequestSkill)
router.delete(
  '/skill',
  validateDeleteResourceRequestSkill,
  deleteResourceRequestSkill
)

router.delete('/', validateDeleteResourceRequest, deleteResourceRequest)
router.put('/', validateUpdateResourceRequest, updateResourceRequest)
router.post('/one', validateGetResourceRequest, getResourceRequest)
router.post(
  '/action/all',
  validateGetResourceRequestActions,
  getResourceRequestActions
)
router.post(
  '/action',
  validateAddResourceRequestActions,
  addResourceRequestِAction
)
router.put(
  '/action',
  validateUpdateResourceRequestActions,
  updateResourceRequestAction
)

module.exports = router
