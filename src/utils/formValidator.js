// Utility functions for form validation

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^\+?[\d\s\-\(\)]{10,}$/;
  return re.test(phone);
};

export const validateRequired = (value) => {
  return value !== undefined && value !== null && value !== '';
};

export const validateMinLength = (value, minLength) => {
  return value && value.length >= minLength;
};

export const validateMaxLength = (value, maxLength) => {
  return !value || value.length <= maxLength;
};

export const validateNumber = (value) => {
  return !isNaN(value) && !isNaN(parseFloat(value));
};

export const validateInteger = (value) => {
  return Number.isInteger(Number(value));
};

export const validateUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};

export const validatePassword = (password) => {
  // At least 8 characters, one uppercase, one lowercase, one number
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return re.test(password);
};

export const validateForm = (formData, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach(field => {
    const value = formData[field];
    const fieldRules = rules[field];
    
    for (const rule of fieldRules) {
      if (rule.required && !validateRequired(value)) {
        errors[field] = rule.message || `${field} is required`;
        break;
      }
      
      if (rule.minLength && !validateMinLength(value, rule.minLength)) {
        errors[field] = rule.message || `${field} must be at least ${rule.minLength} characters`;
        break;
      }
      
      if (rule.maxLength && !validateMaxLength(value, rule.maxLength)) {
        errors[field] = rule.message || `${field} must be no more than ${rule.maxLength} characters`;
        break;
      }
      
      if (rule.email && !validateEmail(value)) {
        errors[field] = rule.message || 'Please enter a valid email address';
        break;
      }
      
      if (rule.phone && !validatePhone(value)) {
        errors[field] = rule.message || 'Please enter a valid phone number';
        break;
      }
      
      if (rule.number && !validateNumber(value)) {
        errors[field] = rule.message || 'Please enter a valid number';
        break;
      }
      
      if (rule.integer && !validateInteger(value)) {
        errors[field] = rule.message || 'Please enter a valid integer';
        break;
      }
      
      if (rule.url && !validateUrl(value)) {
        errors[field] = rule.message || 'Please enter a valid URL';
        break;
      }
      
      if (rule.password && !validatePassword(value)) {
        errors[field] = rule.message || 'Password must be at least 8 characters with uppercase, lowercase, and number';
        break;
      }
      
      if (rule.custom && !rule.custom(value)) {
        errors[field] = rule.message || `${field} is invalid`;
        break;
      }
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};