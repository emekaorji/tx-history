'use client';

import axios from 'axios';
import { useCallback, useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Sample response from Etherscan
// {
//   "blockNumber": "302086",
//   "timeStamp": "1443428683",
//   "hash": "0x9b629147b75dc0b275d478fa34d97c5d4a26926457540b15a5ce871df36c23fd",
//   "nonce": "109",
//   "blockHash": "0xa3c3db0ff0bb72b859d670b04bcd2831731b7c36ba578ece204f49de9ffea05c",
//   "transactionIndex": "1",
//   "from": "0x1db3439a222c519ab44bb1144fc28167b4fa6ee6",
//   "to": "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
//   "value": "250000000000000000",
//   "gas": "90000",
//   "gasPrice": "50000000000",
//   "isError": "0",
//   "txreceipt_status": "",
//   "input": "0x",
//   "contractAddress": "",
//   "cumulativeGasUsed": "42000",
//   "gasUsed": "21000",
//   "confirmations": "19859831",
//   "methodId": "0x",
//   "functionName": ""
// }

export default function Home() {
  const [coinAddress, setCoinAddress] = useState('');
  const [tradeHistory, setTradeHistory] = useState([]);

  const getTransactionHistory = useCallback(async () => {
    try {
      const response = await axios.get('https://api.etherscan.io/api', {
        params: {
          module: 'account',
          action: 'txlist',
          address: coinAddress,
          startblock: 0,
          endblock: 999999,
          sort: 'asc',
          apikey: '38NG6NJIVE89FCMVVMTHT8NG12Q633YVUT',
        },
      });

      const transactions = response.data.result;
      console.log(transactions);
      setTradeHistory(transactions);
    } catch (error) {
      console.error('Error fetching transaction history:', error);
    }
  }, [coinAddress]);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      getTransactionHistory();
    },
    [getTransactionHistory]
  );

  return (
    <main className='min-h-screen items-center justify-between p-24 text-center'>
      <h2 className='text-center text-4xl'>Get Trade History</h2>
      <form
        className='flex flex-col items-center gap-2'
        onSubmit={handleSubmit}>
        <input
          type='text'
          value={coinAddress}
          onChange={(e) => setCoinAddress(e.target.value)}
          placeholder='Enter address'
        />
        <button className='bg-slate-300 p-2' type='submit'>
          Get Trade History
        </button>

        <DataTableDemo data={tradeHistory} />
      </form>
    </main>
  );
}

/**
 * Sample Domains and Addresses
 *
 * OpenSea - 0x5b3256965e7C3cF26E11FCAf296DfC8807C01073
 * UniSwap - 0x1a9C8182C09F50C8318d769245beA52c32BE35BC
 * Metamask - 0x0c54FcCd2e384b4BB6f2E405Bf5Cbc15a017AaFb
 * MakerDAO - 0xfb3Ca875955675d091e6f82038A288e97284400f
 *
 * Vitalik - 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045
 */

export const columns = [
  {
    accessorKey: 'blockNumber',
    header: 'Block Number',
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('blockNumber')}</div>
    ),
  },
  {
    accessorKey: 'timeStamp',
    header: 'Time Stamp',
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('timeStamp')}</div>
    ),
  },
  {
    accessorKey: 'hash',
    header: 'Hash',
    cell: ({ row }) => <div className='capitalize'>{row.getValue('hash')}</div>,
  },
  {
    accessorKey: 'nonce',
    header: 'Nonce',
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('nonce')}</div>
    ),
  },
  {
    accessorKey: 'blockHash',
    header: 'Block Hash',
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('blockHash')}</div>
    ),
  },
  {
    accessorKey: 'transactionIndex',
    header: 'Transaction Index',
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('transactionIndex')}</div>
    ),
  },
  {
    accessorKey: 'from',
    header: 'From',
    cell: ({ row }) => <div className='capitalize'>{row.getValue('from')}</div>,
  },
  {
    accessorKey: 'to',
    header: 'To',
    cell: ({ row }) => <div className='capitalize'>{row.getValue('to')}</div>,
  },
  {
    accessorKey: 'value',
    header: 'Value',
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('value')}</div>
    ),
  },
  {
    accessorKey: 'gas',
    header: 'Gas',
    cell: ({ row }) => <div className='capitalize'>{row.getValue('gas')}</div>,
  },
  {
    accessorKey: 'gasPrice',
    header: 'Gas Price',
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('gasPrice')}</div>
    ),
  },
  {
    accessorKey: 'isError',
    header: 'Is Error',
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('isError')}</div>
    ),
  },
  {
    accessorKey: 'txreceipt_status',
    header: 'Txreceipt Status',
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('txreceipt_status')}</div>
    ),
  },
  {
    accessorKey: 'input',
    header: 'Input',
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('input')}</div>
    ),
  },
  {
    accessorKey: 'contractAddress',
    header: 'Contract Address',
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('contractAddress')}</div>
    ),
  },
  {
    accessorKey: 'cumulativeGasUsed',
    header: 'Cumulative Gas Used',
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('cumulativeGasUsed')}</div>
    ),
  },
  {
    accessorKey: 'gasUsed',
    header: 'Gas Used',
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('gasUsed')}</div>
    ),
  },
  {
    accessorKey: 'confirmations',
    header: 'Confirmations',
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('confirmations')}</div>
    ),
  },
  {
    accessorKey: 'methodId',
    header: 'Method Id',
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('methodId')}</div>
    ),
  },
  {
    accessorKey: 'functionName',
    header: 'Function Name',
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('functionName')}</div>
    ),
  },
];

function DataTableDemo({ data }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    // getSortedRowModel: getSortedRowModel(),
    // getFilteredRowModel: getFilteredRowModel(),
    state: {},
  });

  return (
    <div className='w-full'>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
