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
import { Input } from '@/global/components/ui/input';
import { ScrollArea } from '@/global/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileJson, History } from 'lucide-react';
import JsonTreeView from '@/global/components/json-tree-view';
import JsonCodeView from '@/global/components/json-code-view';
import JsonTableView from '@/global/components/json-table-view';
import JsonMetadata from '@/global/components/json-metadata';
import { useLocalStorage } from '@/hooks/use-local-storage';

type NavItemProps = {
  name: string;
  href: string;
};

const navItems: NavItemProps[] = [
  { name: 'JSON Viewer', href: '/' },
  { name: 'JSON Comparison', href: '/json-comparison' },
  { name: 'JSON File', href: '/json-files' },
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

export default function JSONFiles() {
  const [jsonData, setJsonData] = useState<any>(null);
  const { toast } = useToast();
  const { history, addToHistory } = useLocalStorage();

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target?.result as string);
        setJsonData(parsed);
        addToHistory(parsed);
        toast({
          title: 'File Loaded Successfully',
          description: `${file.name} has been parsed and loaded.`,
        });
      } catch (error) {
        toast({
          title: 'Invalid JSON File',
          description: 'The selected file contains invalid JSON.',
          variant: 'destructive',
        });
      }
    };
    reader.readAsText(file);
  };

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
        <div className='grid grid-cols-1 md:grid-cols-2 mb-8 bg-gray-200 rounded-[20px]'>
          <Card>
            <CardContent className='p-6 border-r border-[#cecdcd] h-[100%]'>
              <h2 className='text-2xl font-semibold mb-4'>Input Methods</h2>
              <div className='space-y-4'>
                <div className='flex gap-4'>
                  <Input
                    type='file'
                    accept='.json'
                    onChange={handleFileUpload}
                    className='hidden'
                    id='json-upload'
                  />
                  <Button
                    onClick={() =>
                      document.getElementById('json-upload')?.click()
                    }
                    className='flex items-center gap-[8px] bg-black text-white px-[12px] py-[8px] rounded-[8px]'
                  >
                    <Upload className='h-5 w-5' />
                    Upload JSON File
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='p-6'>
              <h2 className='text-2xl font-semibold mb-4'>JSON Metadata</h2>
              <JsonMetadata data={jsonData} />
            </CardContent>
          </Card>
        </div>
        <Tabs
          defaultValue='tree'
          className='w-full bg-gray-300 rounded-[20px] overflow-auto'
        >
          <TabsList className='grid w-full grid-cols-3 lg:w-[400px] bg-gray-500'>
            <TabsTrigger value='tree'>Tree View</TabsTrigger>
            <TabsTrigger value='code'>Code View</TabsTrigger>
            <TabsTrigger value='table'>Table View</TabsTrigger>
          </TabsList>
          <TabsContent value='tree'>
            <Card>
              <CardContent className='p-6'>
                <ScrollArea className='h-[500px]'>
                  <JsonTreeView data={jsonData} />
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='code'>
            <Card>
              <CardContent className='p-6'>
                <ScrollArea className='h-[500px]'>
                  <JsonCodeView data={jsonData} />
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='table'>
            <Card>
              <CardContent className='p-6'>
                <ScrollArea className='h-[500px]'>
                  <JsonTableView data={jsonData} />
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
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
