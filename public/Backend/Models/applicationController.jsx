const Application = require('.../models/Application');

const submitApplication = async (req, res) => {
  const { name, email, license } = req.body;

  const application = await Application.create({
    name,
    email,
    license,
  });

  if (application) {
    res.status(201).json(application);
  } else {
    res.status(400).json({ message: 'Invalid application data' });
  }
};

const getApplications = async (req, res) => {
  const applications = await Application.find();
  res.json(applications);
};

const updateApplicationStatus = async (req, res) => {
  const application = await Application.findById(req.params.id);

  if (application) {
    application.status = req.body.status || application.status;
    const updatedApplication = await application.save();
    res.json(updatedApplication);
  } else {
    res.status(404).json({ message: 'Application not found' });
  }
};

module.exports = { submitApplication, getApplications, updateApplicationStatus };
