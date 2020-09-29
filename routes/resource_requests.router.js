const express = require("express");
const router = express.Router();

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
} = require("../services/resource_requests.service");

// const {
//   validateGetAllResourceRequests,
//   validateAddResourceRequest,
//   validateUpdateResourceRequest,
//   validateDeleteResourceRequest,
//   validateGetResourceRequest,
//   validateGetResourceRequestActions,
//   validateDeleteResourceRequestActions,
//   validateUpdateResourceRequestActions,
//   validateAddResourceRequestActions,
// } = require('../middlewares/validations/resourcerequest.validations')
// const {
//   verifyToken,
//   verifyAdmin,
//   verifySales,
//   verifyTech,
//   authorizeUser,
//   authorizeEdit,
// } = require('../auth/verifyToken')

router.post(
  "/all",
  //  validateGetAllResourceRequests,
  getAllResourceRequests
);
router.post(
  "/",
  // validateAddResourceRequest,
  addResourceRequest
);
router.post("/exportAll", exportAllResourceRequests);

router.delete(
  "/",
  //  validateDeleteResourceRequest,
  deleteResourceRequest
);
router.put(
  "/",
  //  validateUpdateResourceRequest,
  updateResourceRequest
);
router.post(
  "/one",
  // validateGetResourceRequest,
  getResourceRequest
);
router.get(
  "/action/",
  // validateGetResourceRequestActions,
  getResourceRequestActions
);
// router.delete(
//   '/action',
//   validateDeleteResourceRequestActions,
//   deleteResourceRequestAction
// )
router.post(
  "/action",
  // validateAddResourceRequestActions,
  addResourceRequestِAction
);
router.put(
  "/action",
  // validateUpdateResourceRequestActions,
  updateResourceRequestAction
);

module.exports = router;
