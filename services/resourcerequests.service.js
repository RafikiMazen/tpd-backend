const { filter } = require('compression')
const ResourceRequestSkill = require('../models/resource_request_skills.model')
const ResourceRequest = require('../models/resource_requests.model')

//view resource requests list with fiters
const viewResourceRequestList = async (req, res) => {
  try {
    const page = req.body.Page
    const limit = req.body.Limit
    const filters = req.body.Filters
    var filtersMainApplied = []
    var filtersSecondaryApplied = []
    if (filters) {
      const values = Object.values(filters)
      Object.keys(filters).forEach((key, index) => {
        if (key === 'Category' || key === 'Subcategory') {
          filtersSecondaryApplied.push({
            [key]: filters[key],
          })
        } else {
          filtersMainApplied.push({
            [key]: filters[key],
          })
        }
      })
    }
    // let orderClause = []
    // const sorting = req.body.Sorting

    // if (sorting.type === 'DESC') {
    //   orderClause = [sorting.by, 'DESC']
    // } else {
    //   orderClause = [sorting.by, 'ASC']
    // }
    let result
    ResourceRequest.hasMany(ResourceRequestSkill, {
      foreignKey: 'request_reference_number',
    })
    if (filtersSecondaryApplied.length != 0) {
      result = await ResourceRequest.findAll({
        offset: page * limit,
        limit,
        where: filtersMainApplied,
        order: [
          ['updatedAt', 'DESC'],
          ['reference_number', 'DESC'],
        ],
        include: [
          {
            model: ResourceRequestSkill,
            where: filtersSecondaryApplied,
            required: true,
          },
        ],
      })
    } else {
      result = await ResourceRequest.findAll({
        offset: page * limit,
        limit,
        where: filtersMainApplied,
        order: [
          ['updatedAt', 'DESC'],
          ['reference_number', 'DESC'],
        ],
      })
    }
    const count = result.length

    return res.json({
      ResourceRequests: result,
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
// reference_number INT(11)manager_name VARCHAR(256)function VARCHAR(128)title VARCHAR(128)start_date DATEend_date DATEpropability INT(11)percentage INT(11)status VARCHAR(32)core_team_member VARCHAR(1)replacenement VARCHAR(1)replacement_for VARCHAR(256)requests_count INT(11)related_opportunity VARCHAR(128)comments VARCHAR(256)assigned_resource VARCHAR(256)actual_percentage INT(11

// const addResourceRequest = async (req, res) => {
//   try {
//     try {
//         const resourceRequest = req.body.ResourceRequest
//         const checkCustomer = await ResourceRequest.findOne({
//         reference_number:resourceRequest.reference_number,
//         })
//         if (!checkCustomer) {
//           return res.json({
//             error: 'A request with the same refernce number already exists',
//             // statusCode: statusCodes.entityNotFound,
//           })
//         }

//         const orderCreated = await ResourceRequest.create(resourceRequest)
//         checkCustomer.ordersList.push(orderCreated._id)

//         return res.json({
//           msg: 'Order successfully added',
//           statusCode: statusCodes.success,
//         })
//       } catch (exception) {
//         console.log(exception)
//         return res.json({
//           error: 'Something went wrong',
//           statusCode: statusCodes.unknown,
//         })
//       }
// }

module.exports = { viewResourceRequestList }
