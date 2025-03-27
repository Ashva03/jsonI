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
    className='relative px-4 py-2 text-gray-800 font-medium transition duration-300 rounded-lg hover:bg-blue-50 hover:text-blue-600'
  >
    {name}
    <span className='absolute left-1/2 bottom-0 h-1 w-0 bg-blue-600 transition-all duration-300 group-hover:w-3/4 -translate-x-1/2'></span>
  </a>
);

export default function JSONComparisonPage() {
  const [jsonData, setJsonData] = useState<any>(null);
  const [comparisonData, setComparisonData] = useState<any>(null);
  const { history } = useLocalStorage();

  return (
    <div className='bg-gray-100 text-gray-800'>
      <header className='bg-white shadow-md p-5 sticky top-0 w-full z-50'>
        <div className='container mx-auto flex justify-between items-center'>
          <span className='text-2xl font-bold text-blue-600'>JSON Viewer</span>
          <div className='flex space-x-4'>
            {navItems.map((item, index) => (
              <NavbarItem key={index} {...item} />
            ))}
          </div>
        </div>
      </header>
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
        {/* History Section */}
        <Card className='mt-8 bg-white shadow-lg border rounded-xl border-gray-200'>
          <CardContent className='p-6'>
            <div className='flex items-center gap-2 mb-4'>
              <History className='h-6 w-6 text-gray-500' />
              <h2 className='text-lg font-semibold'>Recent History</h2>
            </div>
            <ScrollArea className='h-40'>
              {history.length > 0 ? (
                history.map((item, index) => (
                  <Button
                    key={index}
                    variant='ghost'
                    className='w-full flex items-center justify-start hover:bg-gray-100 transition rounded-lg px-4 py-2 text-gray-700'
                    onClick={() => setJsonData(item)}
                  >
                    <FileJson className='mr-2 h-5 w-5 text-blue-500' />
                    JSON #{history.length - index}
                  </Button>
                ))
              ) : (
                <p className='text-gray-500'>No history available</p>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
