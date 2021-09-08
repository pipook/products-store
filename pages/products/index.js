import Head from 'next/head'
import { useState, useEffect } from 'react';
import * as Realm from 'realm-web';
import Header from '../../components/Header';
import Container from '../../components/Container';
import Category from '../../components/Category';
import Products from '../../components/Products';
import Pagination from '../../components/Pagination';
import Footer from '../../components/Footer';

export default function Home() {
  const[products, setProducts] = useState([]);
  useEffect(async () => {
    const REALM_APP_ID = process.env.NEXT_PUBLIC_REALM_APP_ID;
    const app = new Realm.App({id: REALM_APP_ID});
    const credentials = Realm.Credentials.anonymous();
    try{
      const user = await app.logIn(credentials);
      const allProducts = await user.functions.getAllProducts();
      setProducts(() => allProducts);
    }catch(error){
      console.error(error);
    }
  }, [])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-white w-full min-h-screen">
        <Header />
        <Container>
          <Category category="All Products" categoryCount={`${products.length} Products`} />
          <Products products={products} />
          <Pagination />
        </Container>
        <Footer />
      </div>
    </div>
  )
}
