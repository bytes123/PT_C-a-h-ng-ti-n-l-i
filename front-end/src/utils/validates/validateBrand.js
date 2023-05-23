export default function validateBrand(values) {
  let errors = {};

  if (!values.brand_name.trim()) {
    errors.brand_name = "Vui lòng nhập tên hãng";
  }

  return errors;
}
