"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface JsonTableViewProps {
  data: any;
}

const JsonTableView: React.FC<JsonTableViewProps> = ({ data }) => {
  const flattenObject = (obj: any, prefix = "") => {
    return Object.keys(obj || {}).reduce((acc: any, key: string) => {
      const pre = prefix.length ? prefix + "." : "";
      if (
        typeof obj[key] === "object" &&
        obj[key] !== null &&
        !Array.isArray(obj[key])
      ) {
        Object.assign(acc, flattenObject(obj[key], pre + key));
      } else {
        acc[pre + key] = obj[key];
      }
      return acc;
    }, {});
  };

  const flatData = data ? flattenObject(data) : {};
  const entries = Object.entries(flatData);

  if (!data) {
    return (
      <div className="text-muted-foreground text-center p-4">
        No JSON data to display
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[300px]">Path</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {entries.map(([path, value], index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{path}</TableCell>
            <TableCell>{Array.isArray(value) ? "array" : typeof value}</TableCell>
            <TableCell>
              {value === null
                ? "null"
                : Array.isArray(value)
                ? `[${value.join(", ")}]`
                : typeof value === "object"
                ? JSON.stringify(value)
                : String(value)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default JsonTableView;