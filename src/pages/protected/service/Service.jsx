import Main from "../../../layouts/Main";
import Create from "./Create";
import Update from "./Update";
import Table from "./Table";
import Delete from "./Delete";

function Service() {
  return (
    <Main>
      <Create />
      <Update />
      <Delete />
      <Table />
    </Main>
  );
}

export default Service;
