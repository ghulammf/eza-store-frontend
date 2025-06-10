function Table({ children }) {
  return (
    <table
      className="min-w-full table-auto rounded-2xl overflow-hidden"
      cellSpacing="0"
    >
      {children}
    </table>
  );
}

export default Table;
