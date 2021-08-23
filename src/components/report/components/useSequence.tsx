const SequenceCellRenderer = ({ row }) => {
  return (
    <div>
      <b>{Number(row.index) + 1}</b>
    </div>
  );
};

const SequenceHeaderRenderer = () => {
  return <div>#</div>;
};

export const useSequenceColumn = (hooks) => {
  hooks.visibleColumns.push((columns) => [
    {
      id: "sequence",
      Header: SequenceHeaderRenderer,
      Cell: SequenceCellRenderer,
      width: 5,
      maxWidth: 5,
      minWidth: 5,
    },
    ...columns,
  ]);
};
