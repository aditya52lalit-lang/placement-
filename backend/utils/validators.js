// Validation utilities for backend
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  return password && password.length >= 6;
};

const validateName = (name) => {
  return name && name.trim().length >= 2;
};

const validateBackground = (background) => {
  const validBackgrounds = ['B.Tech', 'B.Com', 'MBA', 'Degree'];
  return validBackgrounds.includes(background);
};

const validateBranch = (branch) => {
  return branch && branch.trim().length > 0;
};

const validateDomain = (domain) => {
  const validDomains = ['AI', 'Web Development', 'Data Science', 'Robotics', 'Core Engineering'];
  return validDomains.includes(domain);
};

const validateDomains = (domains) => {
  if (!Array.isArray(domains)) return false;
  if (domains.length === 0) return false;
  return domains.every(domain => validateDomain(domain));
};

module.exports = {
  validateEmail,
  validatePassword,
  validateName,
  validateBackground,
  validateBranch,
  validateDomain,
  validateDomains
};
