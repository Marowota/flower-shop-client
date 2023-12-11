import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductImages from "@/components/ProductImages";
import Title from "@/components/Title";
import WhiteBox from "@/components/WhiteBox";
import CartIcon from "@/components/icons/Cart";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import convertPrice from "@/utils/convertPrice";
import { useContext } from "react";
import styled from "styled-components";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 40px;
  margin-top: 40px;
`;

const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const Price = styled.span`
  font-size: 1.4rem;
`;

export default function ProductPage({ product }) {
  const { addProduct } = useContext(CartContext);
  return (
    <>
      <Header />
      <Center>
        <div className="grid grid-cols-3 m-10 shadow-md border rounded-lg p-10">
          <div className="col-span-1">
            <ProductImages images={product.images} />
          </div>
          <div className="col-span-2 flex flex-col gap-4">
            <div className="font-semibold text-4xl">{product.title}</div>
            <p
              dangerouslySetInnerHTML={{
                __html: product?.description.replace(/\n/g, "<br />"),
              }}
            ></p>
            <div className="flex items-center gap-7">
              <div className="text-2xl font-bold text-rose-500">
                {convertPrice((product.price * (100 - product.discount)) / 100)}{" "}
                đ
              </div>
              <div className="text-base text-gray-400 line-through">
                {convertPrice(product.price)} đ
              </div>
              <div className="bg-pink-500 text-white p-1 rounded-md">
                -{product.discount}%
              </div>
            </div>
            <div>
              <button
                className="flex items-center gap-1 border-2 border-pink-400 rounded-md text-pink-600 px-4 py-2 text-lg bg-white hover:ring-ping-400 hover:ring-1 hover:ring-offset-0 hover:bg-pink-400 hover:text-white"
                onClick={() => {
                  addProduct(product._id);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}