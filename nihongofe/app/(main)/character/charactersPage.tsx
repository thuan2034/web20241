"use client";
import React, { useState } from 'react';
import AlphabetTabs from './alphabetTabs';
import CharacterTable from './characterTable';
import { hiragana, katakana, kanji } from './charactersData';

const CharactersPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('Hiragana');

  const getCharacters = () => {
    switch (selectedTab) {
      case 'Hiragana':
        return hiragana;
      case 'Katakana':
        return katakana;
      case 'Kanji':
        return kanji;
      default:
        return [];
    }
  };

  return (
    <div className="container mx-auto ">
      <AlphabetTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab}  />
      <CharacterTable characters={getCharacters()} />
    </div>
  );
};

export default CharactersPage;
