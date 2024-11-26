import React from 'react';
import CharactersPage from './charactersPage'; // Adjust the path to your CharactersPage component
import { StickyWrapper } from "@/components/stickywrapper";
import { FeedWrapper } from "@/components/feedwrapper";
import { UserProgress } from "@/components/userprogress";
const Characters: React.FC = () => {
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
    <StickyWrapper>
        <UserProgress
          activeCourse={{ title: "Japanese", imageSrc: "/jp.svg" }}
          hearts={5}
          points={0}
          testing={false}
        />
      </StickyWrapper>
    <FeedWrapper>
      <CharactersPage />
    </FeedWrapper>
    </div>
  );
};

export default Characters;
