const express = require('express')
const router = express.Router()

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
} = require('../services/certificates.service')

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
} = require('../middlewares/validations/certificate.validations')
// const {
//   verifyToken,
//   verifyAdmin,
//   verifySales,
//   verifyTech,
//   authorizeUser,
//   authorizeEdit,
// } = require('../auth/verifyToken')

router.get('/my', getMyCertificates)
router.post('/employee', validateAddEmployeeCertificate, addEmployeeCertificate)
router.put(
  '/employee',
  validateEditEmployeeCertificate,
  editEmployeeCertificate
)
router.delete(
  '/employee',
  validateDeleteEmployeeCertificate,
  deleteEmployeeCertificate
)
router.post('/', validateAddCertification, addCertification)
router.post(
  '/provider',
  validateAddCertificationProvider,
  addCertificationProvider
)
router.put(
  '/provider',
  validateEditCertificationProvider,
  editCertificationProvider
)
router.delete(
  '/provider',
  validateDeleteCertificationProvider,
  deleteCertificationProvider
)
router.get('/provider', getCertificateProviders)

router.post(
  '/allByProvider',
  validateGetCertificationsByProvider,
  getCertificatesByProvider
)
router.post('/all', validateGetAllCertificates, getCertificates)
router.put('/', validateEditCertification, editCertification)
router.delete('/', validateDeleteCertification, deleteCertification)

module.exports = router
