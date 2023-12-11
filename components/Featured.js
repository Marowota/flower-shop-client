import styled from "styled-components";
import Center from "./Center";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import Link from "next/link";
import trimmedText from "@/utils/trimText";

const Bg = styled.div`
  background-color: #f472b6;
  color: #fff;
  padding: 50px 0;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 1.5rem;
  @media screen and (min-width: 768px) {
    font-size: 3rem;
  }
`;

const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  img {
    max-width: 100%;
    max-height: 200px;
    display: block;
    margin: 0 auto;
  }
  div:nth-child(1) {
    order: 2;
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
    div:nth-child(1) {
      order: 0;
    }

    img {
      max-width: 100%;
    }
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;

export default function Featured({ product }) {
  const { addProduct } = useContext(CartContext);
  function addFeatureToCart() {
    addProduct(product._id);
  }
  return (
    <Center>
      <div className="bg-featured-bg bg-cover bg-no-repeat rounded-[15px] mt-7 p-5">
        <div className="grid grid-cols-3 p-5">
          <div className="flex items-center justify-around col-span-2">
            <div>
              <div className="font-bold font-roboto-slab text-transparent text-7xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 py-5">
                {product?.title}
              </div>
              <div
                className="text-pink-500 mb-5 pl-1 pr-10"
                // dangerouslySetInnerHTML={{
                //   __html: product?.description.replace(/\n/g, "<br />"),
                // }}
              >
                {trimmedText(product?.description)}
              </div>
              <div className="flex gap-2">
                <button className="btn-primary text-lg px-4">
                  <Link href={"/product/" + product?._id}>Read more</Link>
                </button>
                <button
                  className="flex items-center gap-1 border-2 border-pink-400 rounded-md text-pink-600 px-4 py-2 text-lg bg-white hover:ring-ping-400 hover:ring-1 hover:ring-offset-0"
                  onClick={addFeatureToCart}
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
          <div className="col-span-1">
            <img
              src="https://manh-nextjs-ecommerce.s3.amazonaws.com/1702291255423.png"
              alt=""
              className="h-[400px] rounded-lg"
            />
          </div>
        </div>
      </div>
    </Center>
  );
}
