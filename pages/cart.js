import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Table from "@/components/Table";
import convertPrice from "@/utils/convertPrice";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { withSwal } from "react-sweetalert2";
import { useRouter } from "next/router";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img {
      max-width: 80px;
      max-height: 80px;
    }
  }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

export function CartPage() {
  const { swal, cartProducts, addProduct, removeProduct, clearCart } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window.location.href.includes("success")) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);

  function moreOfThisProduct(id) {
    addProduct(id);
  }

  function lessOfThisProduct(id) {
    removeProduct(id);
  }

  async function goToPayment() {
    const response = await axios.post("/api/checkout", {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  }

  let total = 0;
  for (const productId of cartProducts) {
    //const price = products.find((p) => p._id === productId)?.price || 0;
    const product = products.find((p) => p._id === productId);
    const price = product
      ? (product.price * (100 - product.discount)) / 100
      : 0;
    total += price;
  }

  const router = useRouter();

  const handleBackHomePage = () => {
    router.push("/");
  };

  if (isSuccess) {
    return (
      <>
        <Header />
        <Center>
          <div className="flex items-center justify-center mt-20">
            <div className="border-2 rounded-lg flex items-center justify-center flex-col p-5 ">
              <h1 className="title">Thanks for your order!</h1>
              <p className="font text-lg">
                We will email you when your order will be sent.
              </p>
              <button onClick={handleBackHomePage} className="btn-gradient">
                Back to home page!
              </button>
            </div>
          </div>
        </Center>
      </>
    );
  }

  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <div className="box mb-8">
            <div className="text-2xl font-semibold text-rose-500 mb-2">
              Cart
            </div>
            {!cartProducts?.length && <div>Your cart is empty</div>}

            {products?.length > 0 && (
              <table className="basic">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product}>
                      <ProductInfoCell>
                        <div className="">
                          <img
                            src={product.images[0]}
                            alt=""
                            className="w-[90px] h-[90px] rounded-lg"
                          />
                        </div>
                        <div className="my-1">{product.title}</div>
                      </ProductInfoCell>
                      <td>
                        <div className="flex items-center">
                          <button
                            className="border rounded-md w-7 h-7 mx-2 hover:bg-gray-50"
                            onClick={() => lessOfThisProduct(product._id)}
                          >
                            -
                          </button>
                          <div className="text-lg p-2">
                            {
                              cartProducts.filter((id) => id === product._id)
                                .length
                            }
                          </div>
                          <button
                            className="border rounded-md w-7 h-7 mx-2 hover:bg-gray-50"
                            onClick={() => moreOfThisProduct(product._id)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>
                        <div>
                          {convertPrice(
                            (cartProducts.filter((id) => id === product._id)
                              .length *
                              (product.price * (100 - product.discount))) /
                              100
                          )}{" "}
                          đ
                        </div>
                        <div className="text-base text-gray-400 line-through">
                          {convertPrice(product.price)} đ
                        </div>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td>
                      <div className="text-xl mt-5 font-semibold">Total</div>
                    </td>
                    <td></td>
                    <td>
                      <div className="text-xl mt-5 font-semibold">
                        {convertPrice(total)} đ
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>

          {!!cartProducts?.length && (
            <div className="box w-[500px] h-[400px]">
              <div className="text-2xl font-semibold text-rose-500">
                Order information
              </div>
              <input
                type="text"
                placeholder="Name"
                value={name}
                name="name"
                onChange={(ev) => setName(ev.target.value)}
              />
              <input
                type="text"
                placeholder="Email"
                value={email}
                name="email"
                onChange={(ev) => setEmail(ev.target.value)}
              />
              <CityHolder>
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  name="city"
                  onChange={(ev) => setCity(ev.target.value)}
                />
                <input
                  type="text"
                  placeholder="Postal Code"
                  value={postalCode}
                  name="postalCode"
                  onChange={(ev) => setPostalCode(ev.target.value)}
                />
              </CityHolder>
              <input
                type="text"
                placeholder="Street Address"
                value={streetAddress}
                name="streetAddress"
                onChange={(ev) => setStreetAddress(ev.target.value)}
              />
              <input
                type="text"
                placeholder="Country"
                value={country}
                name="country"
                onChange={(ev) => setCountry(ev.target.value)}
              />
              <button className="btn-primary p-2 w-full" onClick={goToPayment}>
                Continue to payment
              </button>
            </div>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}

export default withSwal(
  ({ swal, cartProducts, addProduct, removeProduct, clearCart }, ref) => (
    <CartPage
      swal={swal}
      cartProducts={cartProducts}
      addProduct={addProduct}
      removeProduct={removeProduct}
      clearCart={clearCart}
    />
  )
);
