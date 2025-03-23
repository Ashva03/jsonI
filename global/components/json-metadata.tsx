'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/global/components/ui/card';
import { Badge } from '@/global/components/ui/badge';

interface JsonMetadataProps {
  data: any;
}

const JsonMetadata: React.FC<JsonMetadataProps> = ({ data }) => {
  const calculateMetadata = (obj: any) => {
    const metadata = {
      arrayCount: 0,
      objectCount: 0,
      stringCount: 0,
      numberCount: 0,
      booleanCount: 0,
      nullCount: 0,
      totalProperties: 0,
      maxDepth: 0,
    };

    const traverse = (value: any, depth = 0) => {
      metadata.maxDepth = Math.max(metadata.maxDepth, depth);

      if (value === null) {
        metadata.nullCount++;
      } else if (Array.isArray(value)) {
        metadata.arrayCount++;
        value.forEach((item) => traverse(item, depth + 1));
      } else if (typeof value === 'object') {
        metadata.objectCount++;
        Object.values(value).forEach((v) => traverse(v, depth + 1));
      } else {
        switch (typeof value) {
          case 'string':
            metadata.stringCount++;
            break;
          case 'number':
            metadata.numberCount++;
            break;
          case 'boolean':
            metadata.booleanCount++;
            break;
        }
      }
      metadata.totalProperties++;
    };

    if (data) {
      traverse(data);
    }

    return metadata;
  };

  const metadata = calculateMetadata(data);

  if (!data) {
    return (
      <div className='text-muted-foreground text-center p-4'>
        No JSON data to analyze
      </div>
    );
  }

  return (
    <div className='grid gap-4'>
      <div className='grid grid-cols-2 gap-4'>
        <Card>
          <CardHeader className='pb-2'>
            <CardTitle>Structure</CardTitle>
            <CardDescription>Basic structure information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-2'>
              <div className='flex justify-between'>
                <span>Total Properties:</span>
                <Badge>{metadata.totalProperties}</Badge>
              </div>
              <div className='flex justify-between'>
                <span>Maximum Depth:</span>
                <Badge>{metadata.maxDepth}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='pb-2'>
            <CardTitle>Types</CardTitle>
            <CardDescription>Count of value types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-2'>
              <div className='flex justify-between'>
                <span>Arrays:</span>
                <Badge variant='secondary'>{metadata.arrayCount}</Badge>
              </div>
              <div className='flex justify-between'>
                <span>Objects:</span>
                <Badge variant='secondary'>{metadata.objectCount}</Badge>
              </div>
              <div className='flex justify-between'>
                <span>Strings:</span>
                <Badge variant='secondary'>{metadata.stringCount}</Badge>
              </div>
              <div className='flex justify-between'>
                <span>Numbers:</span>
                <Badge variant='secondary'>{metadata.numberCount}</Badge>
              </div>
              <div className='flex justify-between'>
                <span>Booleans:</span>
                <Badge variant='secondary'>{metadata.booleanCount}</Badge>
              </div>
              <div className='flex justify-between'>
                <span>Null Values:</span>
                <Badge variant='secondary'>{metadata.nullCount}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JsonMetadata;
