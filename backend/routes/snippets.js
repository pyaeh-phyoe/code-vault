const express = require("express")
const requireAuth = require('../middleware/requireAuth')

const {
  getProjects,
  getProject,
  createProject,
  deleteProject,
  updateProject
} = require('../controllers/projects')

const router = express.Router()

router.use(requireAuth)

router.get('/', getProjects)
router.get('/:id', getProject)
router.post('/', createProject)
router.delete('/:id', deleteProject)
router.patch('/:id', updateProject)

module.exports = router


