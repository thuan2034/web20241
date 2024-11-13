import { StickyWrapper } from "@/components/stickywrapper";
import { FeedWrapper } from "@/components/feedwrapper";
import { Header } from "./header";
import { UserProgress } from "@/components/userprogress";
import { Unit } from "./unit";

// Mock function to return fake data
const getUnits = async () => {
  return [
    {
      id: 1,
      order: 1,
      title: "Unit 1",
      description: "Description for Unit 1",
      lessons: [
        {
          id: 1,
          title: "Lesson 1",
          order: 1,
          questions: [
            { id: 1, text: "Question 1" },
            { id: 2, text: "Question 2" },
          ],
          completed: false,
        },
        {
          id: 2,
          title: "Lesson 2",
          order: 2,
          questions: [
            { id: 3, text: "Question 3" },
            { id: 4, text: "Question 4" },
          ],
          completed: false,
        },
        {
          id: 3,
          title: "Lesson 1",
          order: 3,
          questions: [
            { id: 1, text: "Question 1" },
            { id: 2, text: "Question 2" },
          ],
          completed: false,
        },
        {
          id: 4,
          title: "Lesson 1",
          order: 4,
          questions: [
            { id: 1, text: "Question 1" },
            { id: 2, text: "Question 2" },
          ],
          completed: false,
        },
        {
          id: 4,
          title: "Lesson 1",
          order: 4,
          questions: [
            { id: 1, text: "Question 1" },
            { id: 2, text: "Question 2" },
          ],
          completed: false,
        },
      ],
      activeLesson: {
        id: 1,
        title: "Lesson 1",
        order: 1,
        questions: [
          { id: 1, text: "Question 1" },
          { id: 2, text: "Question 2" },
        ],
        completed: false,
        unit: {
          id: 1,
          order: 1,
          title: "Unit 1",
          description: "Description for Unit 1",
        },
      },
      activeLessonPercentage: 0,
    },
    {
      id: 2,
      order: 2,
      title: "Unit 2",
      description: "Description for Unit 2",
      lessons: [
        {
          id: 3,
          title: "Lesson 3",
          order: 1,
          questions: [
            { id: 5, text: "Question 5" },
            { id: 6, text: "Question 6" },
          ],
          completed: false,
        },
        {
          id: 4,
          title: "Lesson 4",
          order: 2,
          questions: [
            { id: 7, text: "Question 7" },
            { id: 8, text: "Question 8" },
          ],
          completed: false,
        },
      ],
      activeLesson: {
        id: 3,
        title: "Lesson 3",
        order: 1,
        questions: [
          { id: 5, text: "Question 5" },
          { id: 6, text: "Question 6" },
        ],
        completed: false,
        unit: {
          id: 2,
          order: 2,
          title: "Unit 2",
          description: "Description for Unit 2",
        },
      },
      activeLessonPercentage: 0,
    },
  ];
};

export type Props = {
  id: number;
  order: number;
  title: string;
  description: string;
  lessons: {
    id: number;
    title: string;
    order: number;
    questions: { id: number; text: string }[];
    completed: boolean;
  }[];
  activeLesson:
    | {
        id: number;
        title: string;
        order: number;
        questions: { id: number; text: string }[];
        completed: boolean;
        unit: {
          id: number;
          order: number;
          title: string;
          description: string;
        };
      }
    | undefined;
  activeLessonPercentage: number;
};

const LearnPage = async () => {
  const units = await getUnits();

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
        <Header title="Japanese" />
        {units.map((unit) => (
          <div key={unit.id} className="mb-10">
            <Unit
              id={unit.id}
              order={unit.order}
              description={unit.description}
              title={unit.title}
              lessons={unit.lessons}
              activeLesson={unit.activeLesson}
              activeLessonPercentage={0}
            />
          </div>
        ))}
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
