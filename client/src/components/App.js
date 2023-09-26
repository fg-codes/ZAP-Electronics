/* hooks and packages */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./CartContext";

/* styles */
import { GlobalStyles } from "../GlobalStyles";
import { styled } from "styled-components";

/* components */
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { Homepage } from "./Homepage";
import { Category } from "./Category";
import { Brand } from "./Brand";
import { Item } from "./Item";
import { Cart } from "./Cart";
import { Checkout } from "./Checkout";
import { Confirmation } from "./Confirmation";
import { Search } from "./Search";

export const App = () => {
  return (
    <>
      <CartProvider>
        <GlobalStyles />
        <BrowserRouter>
          <Body>
            <Sidebar />
            <PageContent>
              <Navbar />
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/category/:category" element={<Category />} />
                <Route path="/brand/:brandId" element={<Brand />} />
                <Route path="/items/:itemId" element={<Item />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order/:orderId" element={<Confirmation />} />
                <Route path="/search/:query" element={<Search />} />
              </Routes>
            </PageContent>
          </Body>
        </BrowserRouter>
      </CartProvider>
    </>
  );
};

const Body = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
