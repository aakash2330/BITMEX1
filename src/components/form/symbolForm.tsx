"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { useDebounce } from "@/lib/debounce";
import axios from "axios";
import { symbolsTest } from "@/lib/Data";
import { useRouter } from "next/navigation";
let symbolData = [""];
export default function SymbolSearch({
  defaultSymbol,
}: {
  defaultSymbol?: string;
}) {
  const router = useRouter();
  const [symbols, setSymbols] = useState<string[]>([]);
  useEffect(() => {
    axios.get("http://localhost:3000/api/symbols").then(({ data }) => {
      console.log({ data });
      const updatedData = data.data.map((s: any) => {
        return s.symbol;
      });
      symbolData = updatedData;
      setSymbols(updatedData);
    });
  }, []);
  const [open, setOpen] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  return (
    <div className="flex  justify-center items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-[150px] justify-start"
          >
            {defaultSymbol ? <>{defaultSymbol}</> : <>+ Set Symbol</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput
              onChangeCapture={(e) => {
                setSymbols((prev) => {
                  const newNames = symbolData.filter((s) => {
                    if (
                      s.startsWith(
                        (e.target as HTMLInputElement).value.toUpperCase(),
                      ) ||
                      s
                        .slice(1)
                        .startsWith(
                          (e.target as HTMLInputElement).value.toUpperCase(),
                        )
                    ) {
                      return true;
                    }
                  });
                  return newNames;
                });
              }}
              placeholder="Select Symbol..."
            />
            <CommandList>
              <CommandEmpty>No results Found</CommandEmpty>
              <CommandGroup>
                {symbols.map((symbol, index) => {
                  return (
                    index < 10 && (
                      <CommandItem
                        key={index}
                        value={symbol}
                        onSelect={(value) => {
                          setSelectedSymbol(
                            symbols.find((priority) => priority === value) ||
                              null,
                          );
                          setOpen(false);
                          router.push(`/graph?symbol=${value}`);
                        }}
                      >
                        <span>{symbol}</span>
                      </CommandItem>
                    )
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
