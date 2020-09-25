const CertificationModel = require('../models/certifications.model')
const CertificationProvider = require('../models/certification_providers.model')
const getAllReleaseRequests = async (req, res) => {
  try {
    const page = req.body.Page
    const limit = req.body.Limit
    let result
    result = await CertificationModel.findAll({
      offset: page * limit,
      limit,
      order: [
        ['updatedAt', 'DESC'],
        ['reference_number', 'DESC'],
      ],
      include: [
        {
          model: CertificationProvider,
          attributes: ['certification_provider_name'],
        },
      ],
    })
    const count = result.length

    return res.json({
      certifications: result,
      count,
    })
  } catch (exception) {
    console.log(exception)
    return res.json({
      error: 'Something went wrong',
      // statusCode: unknown
    })
  }
}

