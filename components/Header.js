import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import Center from "./Center";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import BarsIcon from "./icons/Bars";
import Search from "./icons/Search";

//#f472b6
const StyledHeader = styled.header`
  background-color: #f472b6;
`;

const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  position: relative;
  z-index: 3;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  font-size: 20px;
`;

const StyledNav = styled.nav`
  ${(props) => (props.mobileNavActive ? `display: block;` : `display: none;`)}
  gap: 15px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: #222;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;

const NavLink = styled(Link)`
  color: #f9fafb;
  text-decoration: none;
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    padding: 0;
  }
`;

const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border: 0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const SideIcons = styled.div`
  display: flex;
  align-items: center;
  a {
    display: inline-block;
    min-width: 20px;
    color: red;
    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

export default function Header() {
  const inactiveLink = " text-rose-400 hover:text-rose-500";
  const activeLink = " text-rose-600 font-semibold hover:text-rose-700";
  const { cartProducts } = useContext(CartContext);

  const router = useRouter();
  const { pathname } = router;
  const [mobileNavActive, setMobileNavActive] = useState(false);
  return (
    <div className="bg-gradient-to-r from-cyan-200 via-rose-200 to-pink-200">
      <Center>
        <Wrapper>
          <div className="flex items-center">
            <Link
              href={"/"}
              className="font-semibold font-roboto-slab text-4xl text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600"
            >
              Flower Shop
            </Link>
          </div>
          <div className="flex items-center justify-center w-10/12">
            <div className="flex gap-5">
              <Link
                href={"/"}
                className={pathname === "/" ? activeLink : inactiveLink}
              >
                Home
              </Link>
              <Link
                href={"/products"}
                className={
                  pathname.includes("/products") ? activeLink : inactiveLink
                }
              >
                All flowers
              </Link>
              <Link
                href={"/categories"}
                className={
                  pathname.includes("/categories") ? activeLink : inactiveLink
                }
              >
                Categories
              </Link>
              <Link
                href={"/account"}
                className={
                  pathname.includes("/account") ? activeLink : inactiveLink
                }
              >
                Account
              </Link>
              <Link
                href={"/cart"}
                className={
                  pathname.includes("/cart") ? activeLink : inactiveLink
                }
              >
                Cart ({cartProducts.length})
              </Link>
            </div>
          </div>
          <SideIcons>
            <Link href={"/search"}>
              <Search />
            </Link>
          </SideIcons>
        </Wrapper>
      </Center>
    </div>
  );
}
