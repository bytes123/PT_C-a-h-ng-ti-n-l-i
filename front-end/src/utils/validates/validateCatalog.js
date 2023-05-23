export default function validateCatalog(values) {
  let errors = {};

  if (!values.catalog_name.trim()) {
    errors.catalog_name = "Vui lòng nhập danh mục";
  }

  return errors;
}
