import {
  ColumnDef,
  getCoreRowModel,
  getFacetedRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { useTheme } from '@mui/material';

interface Product {
  productName: string;
  state: string;
  price: number;
}

const data: Product[] = [
  { productName: 'Laptop', state: 'CA', price: 1200 },
  { productName: 'Keyboard', state: 'NY', price: 100 },
  { productName: 'Mouse', state: 'CA', price: 50 },
  { productName: 'Monitor', state: 'TX', price: 300 },
  { productName: 'Headphones', state: 'NY', price: 150 },
  { productName: 'Paper', state: 'FL', price: 10 },
  { productName: 'Pencil', state: 'FL', price: 5 },
];

function FacetedFilter() {
  const theme = useTheme();

  const [selectedState, setSelectedState] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);

  const columns: ColumnDef<Product>[] = useMemo(
    () => [
      {
        accessorKey: 'productName',
        header: 'Product Name',
      },
      {
        accessorKey: 'state',
        header: 'State',
        filterFn: (row, columnId, value) => {
          if (!value) return true;
          return row.getValue(columnId) === value;
        },
      },
      {
        accessorKey: 'price',
        header: 'Price',
        filterFn: (row, columnId, value) => {
          if (value === undefined) return true;
          return row.getValue(columnId) >= value;
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
  });

  const availableStates = useMemo(() => {
    const states = new Set(
      table
        .getColumn('state')
        ?.getFacetedRowModel()
        .rows.map((row) => row.getValue('state') as string)
    );
    return ['', ...Array.from(states).sort()];
  }, [table.getColumn('state')?.getFacetedRowModel().rows]);

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(event.target.value);
    table.getColumn('state')?.setFilterValue(event.target.value);
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const price = event.target.value
      ? parseInt(event.target.value, 10)
      : undefined;
    setMinPrice(price);
    table.getColumn('price')?.setFilterValue(price);
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice ?? ''}
        onChange={handleMinPriceChange}
      />

      <select value={selectedState} onChange={handleStateChange}>
        {availableStates.map((state) => (
          <option key={state} value={state}>
            {state || 'All States'}
          </option>
        ))}
      </select>
      <table
        style={{
          background: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          textAlign: 'right',
        }}
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>{header.id}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{cell.getValue()?.toString()}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FacetedFilter;
