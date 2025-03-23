'use client';

import React from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { Button } from '@/global/components/ui/button';
import { Badge } from '@/global/components/ui/badge';

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

  const renderValue = (value: any, path: string) => {
    if (value === null)
      return <span className='text-muted-foreground'>null</span>;
    if (typeof value === 'boolean')
      return <span className='text-blue-500'>{value.toString()}</span>;
    if (typeof value === 'number')
      return <span className='text-green-500'>{value}</span>;
    if (typeof value === 'string')
      return <span className='text-orange-500'>"{value}"</span>;

    const isArray = Array.isArray(value);
    const isExpanded = expanded.has(path);

    return (
      <div>
        <Button
          variant='ghost'
          size='sm'
          className='h-6 px-1'
          onClick={() => toggleExpand(path)}
        >
          {isExpanded ? (
            <ChevronDown className='h-4 w-4' />
          ) : (
            <ChevronRight className='h-4 w-4' />
          )}
          {isArray ? (
            <Badge variant='secondary' className='ml-2'>
              Array [{value.length}]
            </Badge>
          ) : (
            <Badge variant='secondary' className='ml-2'>
              Object {'{' + Object.keys(value).length + '}'}
            </Badge>
          )}
        </Button>

        {isExpanded && (
          <div className='ml-4 border-l-2 pl-4 mt-1'>
            {isArray
              ? value.map((item: any, index: number) => (
                  <div key={index} className='my-1'>
                    <span className='text-muted-foreground mr-2'>{index}:</span>
                    {renderValue(item, `${path}.${index}`)}
                  </div>
                ))
              : Object.entries(value).map(([key, val]) => (
                  <div key={key} className='my-1'>
                    <span className='text-purple-500 mr-2'>"{key}":</span>
                    {renderValue(val, `${path}.${key}`)}
                  </div>
                ))}
          </div>
        )}
      </div>
    );
  };

  return data ? (
    <div className='font-mono text-sm'>{renderValue(data, 'root')}</div>
  ) : (
    <div className='text-muted-foreground text-center p-4'>
      No JSON data to display
    </div>
  );
};

export default JsonTreeView;
