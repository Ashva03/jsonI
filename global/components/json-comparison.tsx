'use client';

import React from 'react';
import { Textarea } from '@/global/components/ui/textarea';
import { ScrollArea } from '@/global/components/ui/scroll-area';
import { Badge } from '@/global/components/ui/badge';
import { Plus, Minus, Edit } from 'lucide-react';

interface JsonComparisonProps {
  originalData: any;
  comparisonData: any;
  setComparisonData: (data: any) => void;
}

const JsonComparison: React.FC<JsonComparisonProps> = ({
  originalData,
  comparisonData,
  setComparisonData,
}) => {
  const handleComparisonInput = (input: string) => {
    try {
      const parsed = JSON.parse(input);
      setComparisonData(parsed); // Ensure this updates the state
    } catch (error) {
      console.error('Invalid JSON input:', error);
    }
  };

  const compareObjects = (obj1: any, obj2: any, path = '') => {
    const differences: any[] = [];

    // Helper function to add difference
    const addDiff = (type: string, path: string, value1: any, value2: any) => {
      differences.push({
        type,
        path: path || 'root',
        originalValue: value1,
        newValue: value2,
      });
    };

    // Handle cases where either object is null or undefined
    if (!obj1 || !obj2) {
      if (obj1 !== obj2) {
        addDiff('modified', path, obj1, obj2);
      }
      return differences;
    }

    // Get all keys from both objects
    const allKeys: any = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

    for (const key of allKeys) {
      const currentPath = path ? `${path}.${key}` : key;

      if (!(key in obj1)) {
        addDiff('added', currentPath, undefined, obj2[key]);
      } else if (!(key in obj2)) {
        addDiff('removed', currentPath, obj1[key], undefined);
      } else if (typeof obj1[key] !== typeof obj2[key]) {
        addDiff('modified', currentPath, obj1[key], obj2[key]);
      } else if (typeof obj1[key] === 'object') {
        differences.push(...compareObjects(obj1[key], obj2[key], currentPath));
      } else if (obj1[key] !== obj2[key]) {
        addDiff('modified', currentPath, obj1[key], obj2[key]);
      }
    }

    return differences;
  };

  const differences =
    originalData && comparisonData
      ? compareObjects(originalData, comparisonData)
      : [];

  const renderDiffIcon = (type: string) => {
    switch (type) {
      case 'added':
        return <Plus className='h-4 w-4 text-green-500' />;
      case 'removed':
        return <Minus className='h-4 w-4 text-red-500' />;
      case 'modified':
        return <Edit className='h-4 w-4 text-yellow-500' />;
      default:
        return null;
    }
  };

  return (
    <div className='space-y-4'>
      <div>
        <label className='block text-sm font-medium mb-2'>
          Enter comparison JSON:
        </label>
        <Textarea
          placeholder='Paste JSON here for comparison...'
          className='min-h-[100px] px-[12px] py-[8px] border border-[#cecdcd] rounded-[4px] resize-none'
          onChange={(e) => handleComparisonInput(e.target.value)}
        />
      </div>

      {differences.length > 0 ? (
        <ScrollArea className='h-[300px] border rounded-lg p-4'>
          <div className='space-y-2'>
            {differences.map((diff, index) => (
              <div
                key={index}
                className='flex items-center space-x-2 p-2 border rounded'
              >
                {renderDiffIcon(diff.type)}
                <Badge
                  variant={
                    diff.type === 'added'
                      ? 'success'
                      : diff.type === 'removed'
                      ? 'destructive'
                      : 'warning'
                  }
                >
                  {diff.type}
                </Badge>
                <span className='font-mono text-sm'>{diff.path}</span>
                <span className='text-muted-foreground'>
                  {diff.type === 'modified' && (
                    <>
                      {JSON.stringify(diff.originalValue)} →{' '}
                      {JSON.stringify(diff.newValue)}
                    </>
                  )}
                  {diff.type === 'added' && JSON.stringify(diff.newValue)}
                  {diff.type === 'removed' &&
                    JSON.stringify(diff.originalValue)}
                </span>
              </div>
            ))}
          </div>
        </ScrollArea>
      ) : (
        <div className='text-center text-muted-foreground p-4'>
          {originalData && comparisonData
            ? 'No differences found'
            : 'Enter JSON data for comparison'}
        </div>
      )}
    </div>
  );
};

export default JsonComparison;
