import Main from "../../../layouts/Main";
import Cart from "./Cart";
import ProductMenu from "./ProdukMenu";

function Transaksi() {
  return (
    <Main>
      <div className="grid md:flex gap-4 bg-white rounded-2xl w-full mx-auto p-6">
        <section className="md:w-[60%] p-3 sm:p-4 md:p-5 rounded-2xl border border-slate-200">
          <ProductMenu />
        </section>
        <section className="md:w-[40%]">
          <Cart />
        </section>
      </div>
    </Main>
  );
}

export default Transaksi;
