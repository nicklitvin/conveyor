import { Button } from '@/lib/components/ui/button'
import { cn } from '@/lib/utils'
import type { SearchResult } from '@/types'
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import { type ComponentType, useState } from 'react'

export interface RowComponentProps {
  item: SearchResult
}
export interface SearchResultsProps {
  data: SearchResult[]
  groupBy?: (item : SearchResult) => string
  displayItem?: (item : SearchResult) => JSX.Element
  RowComponent?: ComponentType<{ item : SearchResult}>
}

export const SearchResults = ({ 
  data, 
  groupBy = (item) => item.type, 
  // displayItem = (item) => <p key={item.value} className="w-full">{item.value}</p>,
  RowComponent = ({ item }) => <p key={item.value} className="w-full">{item.value}</p>
} : SearchResultsProps) => {
  const [open, setOpen] = useState<string[]>([]);
  const categorizedResults : {[type : string]: SearchResult[]} = {};

  for (const item of data) {
    const category = groupBy(item)

    if (!categorizedResults[category]) {
      categorizedResults[category] = [];
    }
    categorizedResults[category].push(item)
  }
  if (data.length === 0) {
    return (
      <div className='w-full rounded-lg border py-2'>
        <h1 className="w-full text-center font-bold">
          No Results
        </h1>
      </div>
    )
  } 

  return (
    <>
      <div className="w-full py-2">
        <Button className="w-28" onClick={() => setOpen([])}>
          Collapse All
        </Button>
      </div>
      <Accordion.Root type='multiple' className='rounded-lg border' value={open} onValueChange={setOpen}>
        {Object.entries(categorizedResults).map( ([category, searchResults]) => (
          <Accordion.Item key={`item-${category}`} value={category} className='border-b'>
            <Accordion.Header className='w-full'>
              <Accordion.Trigger className='flex w-full flex-start bg-red-200 px-6 py-4'>
                <h1 className="font-bold text-xl">{category}</h1>
                <div className="flex-grow"/>
                <ChevronDown className={cn(
                  'transition-transform duration-500 ease-out',
                  open.includes(category) ? "rotate-180" : ""
                )}/>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className='data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down'>
              <div className='flex w-full flex-row flex-wrap gap-2 px-6 py-2'>
                { searchResults.map( item => (
                  <RowComponent item={item} key={item.value}/>
                ))}

              </div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </>
  )
}

