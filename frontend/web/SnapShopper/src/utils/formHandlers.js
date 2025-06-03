export function handleChange(e, formData, setFormData, errors, setErrors) {
  setFormData({
    ...formData,
    [e.target.id]: e.target.value
  });
  setErrors({
    ...errors,
    [e.target.name]: ''
  });
}