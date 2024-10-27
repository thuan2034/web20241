import { StickyWrapper } from "@/components/stickywrapper";
import { FeedWrapper } from "@/components/feedwrapper";
import { Header } from "./header";
import { UserProgress } from "@/components/userprogress";
const LearnPage = () => {
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={{ title: "Japanese", imageSrc: "/jp.svg" }}
          hearts={5}
          points={100}
          testing={false}
        ></UserProgress>
      </StickyWrapper>
      <FeedWrapper>
        <Header title="Japanese"></Header>
      </FeedWrapper>
    </div>
  );
};
export default LearnPage;
