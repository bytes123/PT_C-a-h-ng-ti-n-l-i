import { path } from "../static/Router";

const ProductData = [
  {
    key: "banh-ngot",
    link: path.menu + "/banh-ngot",
    value: "Bánh ngọt",
    children: [
      {
        key: "banh-kem-sua",
        link: path.menu + "/banh-ngot/phin",
        value: "Bánh kem sữa",
      },
      {
        key: "banh-ngot-esspresso",
        link: path.menu + "/banh-ngot/espresso",
        value: "Bánh ngọt espresso",
      },
    ],
  },
  {
    key: "tea",
    link: path.menu + "/tea",
    value: "trà",
    children: [
      {
        key: "trasenvang",
        link: path.menu + "/tea/trasenvang",
        value: "trà sen vàng",
      },
      {
        key: "trathachdao",
        link: path.menu + "/tea/trathachdao",
        value: "trà thạch đào",
      },
    ],
  },
];

export { ProductData };
