'use client';

import React from 'react';
import { Button } from '@/global/components/ui/button';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface JsonCodeViewProps {
  data: any;
}

const JsonCodeView: React.FC<JsonCodeViewProps> = ({ data }) => {
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    toast({
      title: 'Copied to clipboard',
      description: 'JSON data has been copied to your clipboard.',
    });
  };

  return (
    <div className='relative'>
      <Button size='sm' className='flex gap-[8px]' onClick={handleCopy}>
        <Copy className='h-4 w-4' />
        Copy
      </Button>
      <pre className='bg-muted p-4 rounded-lg overflow-x-auto'>
        <code className='text-sm'>
          {data ? JSON.stringify(data, null, 2) : 'No JSON data to display'}
        </code>
      </pre>
    </div>
  );
};

export default JsonCodeView;
