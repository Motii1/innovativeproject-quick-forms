const express = require('express');
const mongoose = require('mongoose');
const Form = require('../models/filledForm.model');

const filledForm = mongoose.model('pendingforms', Form);
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended: true}));
mongoose.set('useFindAndModify', false);


router.get('/', async (req, res) => {
  try {
    const forms = await filledForm.find();
    res.status(200).json(forms);
  } catch (err) {
    res.status(404).json({message: err});
  }
});

router.get('/:id', async (req, res) => {
  try {
    const forms = await filledForm.find({templateID: req.params.id});
    res.status(200).json(forms);
  } catch (err) {
    res.status(404).json({message: err});
  }
});
router.get('/single/:id', async (req, res) => {
  try {
    const forms = await filledForm.findById(req.params.id);
    res.status(200).json(forms);
  } catch (err) {
    res.status(404).json({message: err});
  }
});
router.post('/', async (req, res) => {
  try {
    const form = new filledForm(req.body);
    const savedForm = await form.save();
    res.status(201).json(savedForm);
  } catch (err) {
    res.status(400).json({message: err});
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const form = await filledForm.findByIdAndRemove(req.params.id);
    res.status(200).json(form);
  } catch (err) {
    res.status(400).json({message: err});
  }
});

module.exports = router;