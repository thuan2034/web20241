import React from 'react';
import { Button } from '@/components/ui/button';
import {Tabs} from '@/components/ui/tabs'
type AlphabetTabsProps = {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
};

const AlphabetTabs: React.FC<AlphabetTabsProps> = ({ selectedTab, setSelectedTab }) => {
  return (
    <div className='mb-10'>
      {/* Tab Navigation */}
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab}></Tabs>
      <div className="text-center mt-6">
        {selectedTab === 'Hiragana' && (
          <div className="flex flex-col text-center justify-center items-center ">
            <h2 className="text-3xl font-bold mb-6">Let's learn Hiragana!</h2>
            <p className="text-gray-600 mb-4">Get to know the main writing system in Japanese</p>
            <Button className="mb-2 text-sky-500 w-80">TIPS</Button>
            <Button variant="primary" className='w-80'>LEARN THE CHARACTERS</Button>
          </div>
        )}
        {selectedTab === 'Katakana' && (
          <div className="flex flex-col text-center justify-center items-center ">
            <h2 className="text-3xl font-bold mb-6">Let's learn Katakana!</h2>
            <p className="text-gray-600 mb-4">Practice characters used for loanwords</p>
            <Button className="mb-2 text-sky-500 w-80">TIPS</Button>
            <Button variant="primary" className='w-80'>LEARN THE CHARACTERS</Button>
          </div>
        )}
        {selectedTab === 'Kanji' && (
          <div className="flex flex-col text-center justify-center items-center ">
            <h2 className="text-3xl font-bold mb-6">Let's practice Kanji!</h2>
            <p className="text-gray-600 mb-4">Practice reading words with kanji characters</p>
            <Button className="mb-2 text-sky-500 w-80">TIPS</Button>
            <Button variant="primary" className='w-80'>LEARN THE CHARACTERS</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlphabetTabs;
