const Project = require('../models/projects')
const mongoose = require('mongoose')

// get all workouts
const getProjects = async (req, res) => {
  const user_id = req.user._id
  const projects = await Project.find({user_id}).sort({createdAt: -1})

  res.status(200).json(projects)
}

// get a single workout
const getProject = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
  }

  const project = await Project.findById(id)

  if (!project) {
    return res.status(404).json({error: 'No such workout'})
  }

  res.status(200).json(project)
}

const createProject = async (req, res) => {
    // console.log(req)
    console.log(req.body)
    console.log(req.user)
  const {title, html, css, js} = req.body

  let emptyFields = []

  if (!title) {
    emptyFields.push('title')
  }
  if (!html) {
    emptyFields.push('html')
  }
  if (!css) {
    emptyFields.push('css')
  }

  if (!js) {
    emptyFields.push('js')
  }

  console.log(emptyFields.length)

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }


  // add to the database
  try {
    const user_id = req.user._id
    const project = await Project.create({ title, html, css, js, user_id })
    res.status(200).json(project)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const deleteProject = async (req, res) => {
  console.log("delete project")
  // console.log(req)
  const { id } = req.params

  console.log(id)

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such workout'})
  }

  const project = await Project.findOneAndDelete({_id: id})

  if(!project) {
    return res.status(400).json({error: 'No such workout'})
  }

  res.status(200).json(project)
}

const updateProject = async (req, res) => {
  const { id } = req.params

  console.log("update")

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such workout'})
  }

  const project = await Project.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!project) {
    return res.status(400).json({error: 'No such workout'})
  }

  res.status(200).json(project)
}

module.exports = {
  getProjects,
  getProject,
  createProject,
  deleteProject,
  updateProject
}