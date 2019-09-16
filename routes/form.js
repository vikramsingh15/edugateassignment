const express = require('express'),
  router = express.Router(),
  { check } = require('express-validator'),
  {
    postForm,
    indexForm,
    showForm,
    claimForm,
    claimedForm
  } = require('../controllers/form'),
  { asyncErrorHandler, auth } = require('../middleware');

//@Route    POST '/api/form'
//@desc     Create new form->get form from the customer
//@access   Public

router.post(
  '/',
  [
    check('name', 'Name is required !!')
      .not()
      .isEmpty(),
    check('email', 'Enter valid email').isEmail(),
    check(
      'interestedCourse',
      'Course in which you are interested is required !!'
    )
      .not()
      .isEmpty()
  ],
  asyncErrorHandler(postForm)
);

//@Route    GET '/api/form/claimed'
//@desc     get claimed form of employee
//@access   Private

router.get('/claimed', auth, asyncErrorHandler(claimedForm));

//@Route    GET '/api/form/:id'
//@desc     Show form ->show form by id
//@access   Public

router.get('/:id', asyncErrorHandler(showForm));

//@Route    GET '/api/form'
//@desc     Index form ->show all form
//@access   Public

router.get('/', asyncErrorHandler(indexForm));

//@Route    PUT '/api/form/:id/'
//@desc     Claim the form
//@access   Private

router.put('/:id', auth, asyncErrorHandler(claimForm));

module.exports = router;
