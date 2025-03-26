'use client';
import { useState } from 'react';
import { Card, CardContent } from '@/global/components/ui/card';
import { Button } from '@/global/components/ui/button';
import { ScrollArea } from '@/global/components/ui/scroll-area';
import { FileJson, History } from 'lucide-react';
import JsonComparison from '@/global/components/json-comparison';
import { useLocalStorage } from '@/hooks/use-local-storage';

type NavItemProps = {
  name: string;
  href: string;
};

const navItems: NavItemProps[] = [
  { name: 'JSON Viewer', href: '/' },
  { name: 'JSON Comparison', href: '/json-comparison' },
  { name: 'JSON File', href: '/json-file' },
  { name: 'JSON Url', href: '/json-url' },
];

const NavbarItem: React.FC<NavItemProps> = ({ name, href }) => (
  <a
    href={href}
    className='px-4 py-2 text-white hover:bg-gray-700 transition rounded-lg'
  >
    {name}
  </a>
);

export default function JSONComparison() {
  const [jsonData, setJsonData] = useState<any>(null);
  const [comparisonData, setComparisonData] = useState<any>(null);
  const { history } = useLocalStorage();

  return (
    <>
      <div className='bg-black p-4 shadow-md sticky top-0 left-0 w-full z-50'>
        <div className='container mx-auto flex justify-between items-center'>
          <span className='text-white text-lg font-bold'>JSON Viewer</span>
          <div className='flex space-x-4'>
            {navItems.map((item, index) => (
              <NavbarItem key={index} {...item} />
            ))}
          </div>
        </div>
      </div>
      <div className='container mx-auto p-6 h-[100%]'>
        <Card className='bg-gray-200 rounded-[20px]'>
          <CardContent className='p-6'>
            <h2 className='text-2xl font-semibold mb-4'>JSON Comparison</h2>
            <JsonComparison
              originalData={jsonData}
              comparisonData={comparisonData}
              setComparisonData={setComparisonData}
            />
          </CardContent>
        </Card>
        <Card className='mt-8 bg-gray-300 rounded-[20px]'>
          <CardContent className='p-6'>
            <div className='flex items-center gap-2 mb-4'>
              <History className='h-6 w-6' />
              <h2 className='text-2xl font-semibold'>Recent History</h2>
            </div>
            <ScrollArea className='h-[200px]'>
              {history.map((item, index) => (
                <Button
                  key={index}
                  variant='ghost'
                  className='w-full justify-start mb-2'
                  onClick={() => setJsonData(item)}
                >
                  <FileJson className='mr-2 h-4 w-4' />
                  JSON #{history.length - index}
                </Button>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
