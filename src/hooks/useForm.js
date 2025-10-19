import { useState } from 'react';

const useForm = (initialState = {}) => {
  const [formData, setFormData] = useState(initialState);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleNestedChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const resetForm = () => {
    setFormData(initialState);
  };
  
  const setFormValue = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  return {
    formData,
    handleChange,
    handleNestedChange,
    resetForm,
    setFormValue,
    setFormData
  };
};

export default useForm;