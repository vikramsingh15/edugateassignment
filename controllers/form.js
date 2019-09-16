const Form = require('../models/form'),
  { validationResult } = require('express-validator');

module.exports = {
  async postForm(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const data = await Form.create(req.body);
    res.json(data);
  },
  async indexForm(req, res, next) {
    const data = await Form.find({ isClaimed: false });
    res.json(data);
  },

  async showForm(req, res, next) {
    const data = await Form.findById(req.params.id);
    res.json(data);
  },

  async claimForm(req, res, next) {
    const form = await Form.findById(req.params.id);
    form.employeeId = req.user.id;
    form.isClaimed = true;
    await form.save();
    res.json(form);
  },

  async claimedForm(req, res, next) {
    const data = await Form.find({ employeeId: req.user.id });
    res.json(data);
  }
};
