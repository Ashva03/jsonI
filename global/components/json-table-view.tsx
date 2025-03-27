'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/global/components/ui/table';
import clsx from 'clsx';

interface JsonTableViewProps {
  data: any;
}

const JsonTableView: React.FC<JsonTableViewProps> = ({ data }) => {
  const flattenObject = (obj: any, prefix = '') => {
    return Object.keys(obj || {}).reduce((acc: any, key: string) => {
      const pre = prefix.length ? prefix + '.' : '';
      if (
        typeof obj[key] === 'object' &&
        obj[key] !== null &&
        !Array.isArray(obj[key])
      ) {
        Object.assign(acc, flattenObject(obj[key], pre + key));
      } else {
        acc[pre + key] = obj[key];
      }
      return acc;
    }, {});
  };

  const flatData = data ? flattenObject(data) : {};
  const entries = Object.entries(flatData);

  if (!data) {
    return (
      <div className='text-muted-foreground text-center p-4'>
        No JSON data to display
      </div>
    );
  }

  return (
    <div className='overflow-auto shadow-md rounded-lg'>
      <Table className='border border-gray-200 rounded-lg'>
        <TableHeader>
          <TableRow className='bg-gray-100 text-gray-700'>
            <TableHead className='w-[300px] p-3'>Path</TableHead>
            <TableHead className='p-3'>Type</TableHead>
            <TableHead className='p-3'>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map(([path, value], index) => (
            <TableRow
              key={index}
              className={clsx(
                'transition-all duration-200 hover:bg-gray-100',
                index % 2 === 0 ? 'bg-white' : 'bg-gray-50',
              )}
            >
              <TableCell className='font-medium p-3'>{path}</TableCell>
              <TableCell
                className={clsx(
                  'font-semibold',
                  Array.isArray(value)
                    ? 'text-blue-600'
                    : typeof value === 'number'
                    ? 'text-green-600'
                    : typeof value === 'boolean'
                    ? 'text-purple-600'
                    : typeof value === 'string'
                    ? 'text-orange-600'
                    : 'text-gray-600',
                )}
              >
                {Array.isArray(value) ? 'array' : typeof value}
              </TableCell>
              <TableCell className='p-3 truncate max-w-[400px]'>
                {value === null
                  ? 'null'
                  : Array.isArray(value)
                  ? `[${value.join(', ')}]`
                  : typeof value === 'object'
                  ? JSON.stringify(value, null, 2)
                  : String(value)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default JsonTableView;
