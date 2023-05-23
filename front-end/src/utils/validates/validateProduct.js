export default function validateProduct(values) {
  let errors = {};

  console.log(values.catalog_id);

  if (!values.product_name) {
    errors.product_name = "Vui lòng nhập tên nhập sản phẩm";
  } else {
    if (!values.product_name.trim()) {
      errors.product_name = "Vui lòng nhập tên nhập sản phẩm";
    }
  }

  if (!values.catalog_id) {
    errors.catalog_id = "Vui lòng chọn danh mục";
  }

  return errors;
}
