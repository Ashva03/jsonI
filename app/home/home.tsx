'use client';
import { useState } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/global/components/ui/tabs';
import { Card, CardContent } from '@/global/components/ui/card';
import { Button } from '@/global/components/ui/button';
import { Textarea } from '@/global/components/ui/textarea';
import { ScrollArea } from '@/global/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { FileJson, History, Trash } from 'lucide-react';
import JsonTreeView from '@/global/components/json-tree-view';
import JsonCodeView from '@/global/components/json-code-view';
import JsonTableView from '@/global/components/json-table-view';
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

export default function HomePage() {
  const [jsonData, setJsonData] = useState<any>(null);
  const [inputText, setInputText] = useState('');
  const { toast } = useToast();
  const { history, addToHistory } = useLocalStorage();

  const handleJsonInput = (input: string) => {
    setInputText(input);
    try {
      const parsed = JSON.parse(input);
      setJsonData(parsed);
      addToHistory(parsed);
      toast({
        title: '✅ JSON Parsed Successfully',
        description: 'Your JSON data has been loaded.',
      });
    } catch (error) {
      toast({
        title: '❌ Invalid JSON',
        description: 'Check your JSON format and try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='bg-gray-100 text-gray-800'>
      {/* Navbar */}
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

      {/* Main Content */}
      <div className='container mx-auto p-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-lg'>
          {/* JSON Input */}
          <Card className='bg-gray-50 border border-gray-200 shadow-md'>
            <CardContent className='p-4'>
              <div className='mb-4 flex justify-between items-center'>
                <h2 className='text-lg font-semibold'>Input JSON</h2>
                <Button
                  variant='destructive'
                  className='flex items-center gap-2 bg-red-500 text-white hover:bg-red-600'
                  onClick={() => {
                    setInputText('');
                    setJsonData(null);
                  }}
                >
                  <Trash size={16} />
                  Clear
                </Button>
              </div>
              <Textarea
                value={inputText}
                placeholder='Paste JSON here...'
                className='h-80 p-3 bg-white text-gray-700 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500'
                onChange={(e) => handleJsonInput(e.target.value)}
              />
            </CardContent>
          </Card>

          {/* JSON Viewer Tabs */}
          <Tabs defaultValue='tree' className='w-full'>
            <TabsList className='grid grid-cols-3 p-1 rounded-lg bg-gray-100 gap-[8px]'>
              <TabsTrigger
                value='tree'
                className='px-6 py-3 text-gray-700 font-medium rounded-md transition-colors duration-200 hover:bg-gray-200'
              >
                Tree View
              </TabsTrigger>
              <TabsTrigger
                value='code'
                className='px-6 py-3 text-gray-700 font-medium rounded-md transition-colors duration-200 hover:bg-gray-200'
              >
                Code View
              </TabsTrigger>
              <TabsTrigger
                value='table'
                className='px-6 py-3 text-gray-700 font-medium rounded-md transition-colors duration-200 hover:bg-gray-200'
              >
                Table View
              </TabsTrigger>
            </TabsList>
            <TabsContent value='tree'>
              <Card className='bg-gray-50 border border-gray-200'>
                <CardContent className='p-6'>
                  <ScrollArea className='h-64'>
                    <JsonTreeView data={jsonData} />
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value='code'>
              <Card className='bg-gray-50 border border-gray-200'>
                <CardContent className='p-6'>
                  <ScrollArea className='h-64'>
                    <JsonCodeView data={jsonData} />
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value='table'>
              <Card className='bg-gray-50 border border-gray-200'>
                <CardContent className='p-6'>
                  <ScrollArea className='h-64'>
                    <JsonTableView data={jsonData} />
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

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
