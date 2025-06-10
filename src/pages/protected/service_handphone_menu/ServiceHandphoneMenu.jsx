import Main from "../../../layouts/Main";
import Create from "./Create";
import Delete from "./Delete";
import Table from "./Table";
import Update from "./Update";

function ServiceHandphoneMenu() {
  return (
    <Main>
      <Create />
      <Update />
      <Delete />
      <Table />
    </Main>
  );
}

export default ServiceHandphoneMenu;
