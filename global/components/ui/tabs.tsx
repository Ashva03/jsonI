'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/public/lib/utils';

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center rounded-lg bg-gray-100 p-2 text-gray-700 dark:bg-gray-800 dark:text-gray-300 shadow-md',
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'px-4 py-2 text-sm font-medium text-gray-700 rounded-md transition-all duration-200 ease-in-out',
      'hover:bg-gray-200 hover:text-blue-600',
      'dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-blue-400',
      'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
      'data-[state=active]:bg-blue-600 data-[state=active]:text-white',
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-4 p-4 bg-white rounded-lg shadow-md border border-gray-200',
      'dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200',
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
