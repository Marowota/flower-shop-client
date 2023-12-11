import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const StyledHeader = styled.header`
  background-color: #f472b6;
`;

const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  font-size: 20px;
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 15px;
`;

const NavLink = styled(Link)`
  color: #f9fafb;
  text-decoration: none;
`;

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  return (
    <div className="bg-gradient-to-r from-cyan-200 via-rose-200 to-pink-200">
      <Center>
        <Wrapper>
          <Link
            href={"/"}
            className="font-semibold font-roboto-slab text-4xl text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600"
          >
            Flower Shop
          </Link>
          <div className="flex gap-5 text-rose-500 items-center">
            <Link href={"/"}>Home</Link>
            <Link href={"/products"}>All flowers</Link>
            <Link href={"/categories"}>Categories</Link>
            <Link href={"/account"}>Account</Link>
            <Link href={"/cart"}>Cart ({cartProducts.length})</Link>
          </div>
        </Wrapper>
      </Center>
    </div>
  );
}
