const express = require('express');
const router = express.Router();
const experiences = require('../controllers/experiences');
const middleware = require('../middleware');
const catchAsync = require('../utils/catchAsync');

router.get("/experiences",catchAsync(experiences.experiences));

router.get("/myExperiences",middleware.isLoggedIn,catchAsync(experiences.myExperiences));

router.get("/addExperience",middleware.isLoggedIn,experiences.addExperience);

router.post("/addExperience",middleware.isLoggedIn,catchAsync(experiences.postExperience));

router.get("/experience/:id",catchAsync(experiences.experienceDetails));

router.get("/editExperience/:id",middleware.isLoggedIn,catchAsync(experiences.editExperience));

router.delete("/deleteExperience/:id",middleware.isLoggedIn,middleware.isAuthorized,catchAsync(experiences.deleteExperience));

router.put("/editExperience/:id",middleware.isLoggedIn,middleware.isAuthorized,catchAsync(experiences.updateExperience));

module.exports = router;