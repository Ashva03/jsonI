'use client';

import React from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { Button } from '@/global/components/ui/button';

interface JsonTreeViewProps {
  data: any;
}

const JsonTreeView: React.FC<JsonTreeViewProps> = ({ data }) => {
  const [expanded, setExpanded] = React.useState<Set<string>>(new Set());

  const toggleExpand = (path: string) => {
    const newExpanded = new Set(expanded);
    if (expanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpanded(newExpanded);
  };

  const formatValue = (value: any) => {
    if (value === null)
      return <span className='text-gray-400 italic'>null</span>;
    if (typeof value === 'boolean')
      return <span className='text-blue-500'>{value.toString()}</span>;
    if (typeof value === 'number')
      return <span className='text-green-500'>{value}</span>;
    if (typeof value === 'string')
      return <span className='text-orange-500'>"{value}"</span>;
    return value;
  };

  const renderTree = (obj: any, path: string) => {
    return Object.entries(obj).map(([key, value]) => {
      const isExpandable = typeof value === 'object' && value !== null;
      const isExpanded = expanded.has(`${path}.${key}`);

      return (
        <div key={key} className='ml-4 border-l-2 border-gray-300 pl-3'>
          <div className='flex items-center gap-2'>
            {isExpandable ? (
              <Button
                variant='ghost'
                size='sm'
                className='h-6 px-2 rounded-md hover:bg-gray-100 transition'
                onClick={() => toggleExpand(`${path}.${key}`)}
              >
                {isExpanded ? (
                  <ChevronDown className='h-4 w-4 text-gray-600' />
                ) : (
                  <ChevronRight className='h-4 w-4 text-gray-600' />
                )}
              </Button>
            ) : (
              <span className='w-4'></span>
            )}
            <span className='text-purple-500 font-medium'>{key}:</span>
            {!isExpandable && (
              <span className='ml-2'>{formatValue(value)}</span>
            )}
          </div>

          {isExpandable && isExpanded && (
            <div className='ml-6'>{renderTree(value, `${path}.${key}`)}</div>
          )}
        </div>
      );
    });
  };

  return (
    <div className='font-mono text-sm bg-white p-4 rounded-lg shadow-md border border-gray-200'>
      {data ? (
        renderTree(data, 'root')
      ) : (
        <div className='text-gray-400 text-center p-4'>
          No JSON data to display
        </div>
      )}
    </div>
  );
};

export default JsonTreeView;
