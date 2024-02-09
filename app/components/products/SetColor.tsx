"use client";

import {
  CartProductType,
  SelectedImgType,
} from "@/app/product/[productId]/ProductDetials";

interface SetColorProps {
  images: SelectedImgType[];
  cartProduct: CartProductType;
  handleColorSelect: (value: SelectedImgType) => void;
}
const SetColor = ({
  images,
  cartProduct,
  handleColorSelect,
}: SetColorProps) => {
  return (
    <div>
      <div className="flex gap-4 items-center">
        <span className="font-semibold">COLOR</span>
        <div className="flex gap-1">
          {images.map((image, index) => {
            return (
              <div
                key={index}
                onClick={() => handleColorSelect(image)}
                className={`
              h-7
              w-7
              border-teal-300
              flex
              items-center
              justify-center
              rounded-full
              ${
                cartProduct.selectedImg.color === image.color
                  ? "border-[1.5px]"
                  : "border-none"
              }`}
              >
                <div
                  style={{ background: image.colorCode }}
                  className="h-5 w-5 rounded-full border-[1.2px] border-slate-300 cursor-pointer"
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SetColor;
