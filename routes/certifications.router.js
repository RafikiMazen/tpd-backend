const express = require('express')
const router = express.Router()

const {
  getMyCertificates,
  getEmployeeCertifcates,
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
  exportCertificates,
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
  validateGetAllCertificatesHistory,
} = require('../middlewares/validations/certificate.validations')
const { verifyTPD, verifyTPDorManager } = require('../auth/verifyToken')

router.post(
  '/history',
  verifyTPD,
  validateGetAllCertificatesHistory,
  getCertificateHistory
)
router.post(
  '/history/export',
  verifyTPD,
  validateGetAllCertificatesHistory,
  exportCertificateHistory
)
router.post('/my', getMyCertificates)
router.post('/employee/all', verifyTPD, getEmployeeCertifcates)

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
router.post('/', verifyTPD, validateAddCertification, addCertification)
router.post(
  '/provider',
  verifyTPD,
  validateAddCertificationProvider,
  addCertificationProvider
)
router.put(
  '/provider',
  verifyTPD,
  validateEditCertificationProvider,
  editCertificationProvider
)
router.delete(
  '/provider',
  verifyTPD,
  validateDeleteCertificationProvider,
  deleteCertificationProvider
)
router.get('/provider', getCertificateProviders)
router.get('/provider/export', verifyTPD, exportCertificateProviders)
router.post('/export', verifyTPD,validateGetAllCertificates, exportCertificates)

router.post(
  '/allByProvider',
  validateGetCertificationsByProvider,
  getCertificatesByProvider
)
router.post('/all', validateGetAllCertificates, getCertificates)
router.put('/', verifyTPD, validateEditCertification, editCertification)
router.delete('/', verifyTPD, validateDeleteCertification, deleteCertification)

module.exports = router
