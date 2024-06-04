import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Slots } from './SlotsStoreContext';
import { Slot } from './Slot';

const meta = {
  title: 'Commons/Slots',
  component: Slots,
  tags: ['autodocs'],
  args: {
    slotKeys: ['top-bun', 'pickles', 'cheese', 'beefpatty', 'bottom-bun'],
  },
} satisfies Meta<typeof Slots>;
export default meta;

type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {
  render: (args) => {
    return (
      <div className="flex flex-col text-center">
        <Slots {...args}>
          <Slot slotKey="top-bun">
            <div className="text-orange-300">TOP BUN</div>
          </Slot>
          <Slot slotKey="pickles">
            <div className="text-lime-400">PICKLES</div>
          </Slot>
          <Slot slotKey="cheese">
            <div className="text-yellow-200">CHEESE</div>
          </Slot>
          <Slot slotKey="beefpatty">
            <div className="text-rose-900">BEEF PATTY</div>
          </Slot>
          <Slot slotKey="bottom-bun">
            <div className="text-orange-400">BOTTOM BUN</div>
          </Slot>
        </Slots>
      </div>
    );
  },
};

export const SlotsWithNonSlots: Story = {
  render: (args) => {
    return (
      <div className="flex flex-col text-center">
        <Slots {...args}>
          <div className="text-orange-300">TOP BUN</div>
          <Slot slotKey="pickles">
            <div className="text-lime-400">PICKLES</div>
          </Slot>
          <Slot slotKey="cheese">
            <div className="text-yellow-200">CHEESE</div>
          </Slot>
          <Slot slotKey="beefpatty">
            <div className="text-rose-900">BEEF PATTY</div>
          </Slot>
          <div className="text-orange-400">BOTTOM BUN</div>
        </Slots>
      </div>
    );
  },
};

export const DuplicateSlots: Story = {
  render: (args) => {
    return (
      <div className="flex flex-col text-center">
        <Slots {...args}>
          <Slot slotKey="top-bun">
            <div className="text-orange-300">TOP BUN</div>
          </Slot>
          <Slot slotKey="beefpatty">
            <div className="text-lime-400">PICKLES</div>
          </Slot>
          <Slot slotKey="beefpatty">
            <div className="text-yellow-200">CHEESE</div>
          </Slot>
          <Slot slotKey="beefpatty">
            <div className="text-rose-900">BEEF PATTY</div>
          </Slot>
          <Slot slotKey="bottom-bun">
            <div className="text-orange-400">BOTTOM BUN</div>
          </Slot>
        </Slots>
      </div>
    );
  },
};

export const DynamicSlots: Story = {
  render: () => {
    const ingredients = [
      'BOTTOM BUN',
      'BEEF PATTY',
      'CHEESE',
      'PICKLES',
      'TOP BUN',
    ];
    const colorList = [
      'text-orange-400',
      'text-rose-900',
      'text-yellow-200',
      'text-lime-400',
      'text-orange-300',
    ];
    const [contents, setContents] = useState<string[]>([]);
    return (
      <div className="flex flex-col text-center">
        <div className="margin-auto width-[100px]">
          {contents.length < ingredients.length && (
            <button
              type="button"
              onClick={() =>
                setContents(ingredients.slice(0, contents.length + 1))
              }
            >
              Add {ingredients[contents.length]}
            </button>
          )}
          {contents.length > 0 && (
            <button
              type="button"
              onClick={() =>
                setContents(ingredients.slice(0, contents.length - 1))
              }
            >
              Remove {ingredients[contents.length - 1]}
            </button>
          )}
        </div>
        <Slots slotKeys={contents}>
          {contents.reverse().map((item, index) => (
            <Slot key={item} slotKey={item}>
              <div className={`${colorList[contents.length - 1 - index]}`}>
                {item}
              </div>
            </Slot>
          ))}
        </Slots>
      </div>
    );
  },
};
