export default function validateProduct(values) {
  let errors = {};

  if (!values.product_id) {
    errors.product_id = "Vui lòng chọn sản phẩm";
  }

  if (!values.detail_product_size) {
    errors.detail_product_size = "Vui lòng chọn trọng lượng";
  }

  if (!values.detail_product_storage) {
    errors.detail_product_storage = "Vui lòng chọn số lượng hàng còn trong kho";
  }

  return errors;
}
