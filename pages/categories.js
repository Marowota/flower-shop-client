import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductBox from "@/components/ProductBox";
import Title from "@/components/Title";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { getServerSession } from "next-auth";
import { RevealWrapper } from "next-reveal";
import Link from "next/link";
import styled from "styled-components";
import { authOptions } from "./api/auth/[...nextauth]";
import { WishedProduct } from "@/models/WishedProduct";
import { mongooseConnect } from "@/lib/mongoose";

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
`;

const CategoryTitle = styled.div`
  display: flex;
  margin-top: 10px;
  margin-bottom: 0;
  align-items: center;
  gap: 15px;
  h2 {
    margin-bottom: 10px;
    margin-top: 10px;
  }
  a {
    color: #555;
    display: inline-block;
  }
`;

const CategoryWrapper = styled.div`
  margin-bottom: 40px;
`;

const ShowAllSquare = styled(Link)`
  background-color: #ddd;
  height: 160px;
  border-radius: 10px;
  align-items: center;
  display: flex;
  justify-content: center;
  color: #555;
  text-decoration: none;
`;

export default function CategoriesPage({
  mainCategories,
  categoriesProducts,
  wishedProducts = [],
}) {
  return (
    <>
      <Header />
      <Center>
        {mainCategories.map((cat) => (
          <div key={cat} className="mb-5">
            <div className="flex gap-20 my-3 items-center">
              <div className="title">{cat.name}</div>
              <div className="text-xl text-rose-600 hover:text-rose-500 hover:underline">
                <Link href={"/category/" + cat._id}>Show all</Link>
              </div>
            </div>
            <CategoryGrid>
              {categoriesProducts[cat._id].map((p, index) => (
                <RevealWrapper key={index} delay={index * 50}>
                  <ProductBox {...p} wished={wishedProducts.includes(p._id)} />
                </RevealWrapper>
              ))}
              <RevealWrapper delay={categoriesProducts[cat._id].length * 50}>
                <div className="flex h-full w-full">
                  <Link
                    href={"/category/" + cat._id}
                    className="bg-white shadow-lg rounded-md flex items-center justify-center h-[362px] w-full text-rose-500 font-semibold text-xl hover:bg-pink-50 hover:text-rose-400"
                  >
                    Show all &rarr;
                  </Link>
                </div>
              </RevealWrapper>
            </CategoryGrid>
          </div>
        ))}
      </Center>
    </>
  );
}

export async function getServerSideProps(ctx) {
  await mongooseConnect();
  const categories = await Category.find();
  const mainCategories = categories.filter((c) => !c.parent);
  const categoriesProducts = {};
  const allFetchedProductsId = [];
  for (const mainCat of mainCategories) {
    const mainCatId = mainCat._id.toString();
    const childCatIds = categories
      .filter((c) => c.parent?.toString() === mainCatId)
      .map((c) => c._id.toString());
    const categoriesIds = [mainCatId, ...childCatIds];
    const products = await Product.find({ category: categoriesIds }, null, {
      limit: 4,
      sort: { _id: -1 },
    });
    allFetchedProductsId.push(...products.map((p) => p._id.toString()));
    categoriesProducts[mainCat._id] = products;
  }

  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const wishedProducts = session?.user
    ? await WishedProduct.find({
        userEmail: session?.user.email,
        product: allFetchedProductsId,
      })
    : [];
  return {
    props: {
      mainCategories: JSON.parse(JSON.stringify(mainCategories)),
      categoriesProducts: JSON.parse(JSON.stringify(categoriesProducts)),
      wishedProducts: wishedProducts.map((i) => i.product.toString()),
    },
  };
}
