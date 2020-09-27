const express = require('express')
const router = express.Router()

const {
  getMyCertificates,
  addEmployeeCertificate,
  editEmployeeCertificate,
  deleteEmployeeCertificate
} = require('../services/certificates.service')

const {
  validateAddEmployeeCertificate,
  validateEditEmployeeCertificate,
  validateDeleteEmployeeCertificate
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
router.delete('/employee',validateDeleteEmployeeCertificate,deleteEmployeeCertificate)

module.exports = router
