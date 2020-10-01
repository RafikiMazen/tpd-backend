const express = require("express");
const router = express.Router();

const {
  getMyCertificates,
  addEmployeeCertificate,
  editEmployeeCertificate,
  deleteEmployeeCertificate,
  addCertification,
  addCertificationProvider,
  editCertificationProvider,
  deleteCertificationProvider,
  getCertificateProviders,
  getCertificatesByProvider,
  getCertificates,
  deleteCertification,
  editCertification,
  exportCertificateProviders,
  getCertificateHistory,
  exportCertificateHistory,
} = require("../services/certificates.service");

const {
  validateAddEmployeeCertificate,
  validateEditEmployeeCertificate,
  validateDeleteEmployeeCertificate,
  validateAddCertification,
  validateAddCertificationProvider,
  validateEditCertificationProvider,
  validateDeleteCertificationProvider,
  validateGetCertificationsByProvider,
  validateGetAllCertificates,
  validateDeleteCertification,
  validateEditCertification,
  validateGetAllCertificatesHistory,
} = require("../middlewares/validations/certificate.validations");
// const {
//   verifyToken,
//   verifyAdmin,
//   verifySales,
//   verifyTech,
//   authorizeUser,
//   authorizeEdit,
// } = require('../auth/verifyToken')

router.post(
  "/history",
  validateGetAllCertificatesHistory,
  getCertificateHistory
);
router.post(
  "/history/export",
  validateGetAllCertificatesHistory,
  exportCertificateHistory
);
router.post("/my", getMyCertificates);
router.post(
  "/employee",
  validateAddEmployeeCertificate,
  addEmployeeCertificate
);
router.put(
  "/employee",
  validateEditEmployeeCertificate,
  editEmployeeCertificate
);
router.delete(
  "/employee",
  validateDeleteEmployeeCertificate,
  deleteEmployeeCertificate
);
router.post("/", validateAddCertification, addCertification);
router.post(
  "/provider",
  validateAddCertificationProvider,
  addCertificationProvider
);
router.put(
  "/provider",
  validateEditCertificationProvider,
  editCertificationProvider
);
router.delete(
  "/provider",
  validateDeleteCertificationProvider,
  deleteCertificationProvider
);
router.get("/provider", getCertificateProviders);
router.get("/provider/export", exportCertificateProviders);
router.post(
  "/allByProvider",
  validateGetCertificationsByProvider,
  getCertificatesByProvider
);
router.post("/all", validateGetAllCertificates, getCertificates);
router.put("/", validateEditCertification, editCertification);
router.delete("/", validateDeleteCertification, deleteCertification);

module.exports = router;
