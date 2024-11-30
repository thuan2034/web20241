import React from 'react';
import { Button } from '@/components/ui/button';

type CharacterTableProps = {
  characters: { character: string; romanji: string }[];
};

const CharacterTable: React.FC<CharacterTableProps> = ({ characters }) => {
  return (
    <div className="grid gap-3 mx-auto"
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(5, auto)', 
      gap: '10px',
      justifyContent: 'center', 
      maxWidth: '500px', 
    }}>
      {characters.map((item, index) => (
        <Button
          key={index}
          className="flex flex-col items-center justify-center w-20 h-16 rounded-lg shadow-md text-lg p-2"
        >
          <span className="text-xl">{item.character}</span>
          <span className="text-sm text-gray-500">{item.romanji}</span>

        </Button>
      ))}
    </div>
  );
};

export default CharacterTable;
