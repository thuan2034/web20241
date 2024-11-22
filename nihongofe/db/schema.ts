export const courses = {
  id: 1, // Changed to number
  title: "title",
  imageSrc: "image_src",
};

export const coursesRelations = {
  userProgress: "userProgress",
  units: "units",
};

export const lessonsEnum = ["current", "completed", "locked"];

export const units = {
  id: 1, // Changed to number
  title: "title",
  description: "description",
  courseId: 1, // Changed to number
  order: 1,
};

export const unitsRelations = {
  course: "course",
  lessons: "lessons",
};

export const lessons = {
  id: 1, // Changed to number
  unitId: 1, // Changed to number
  order: 1,
  status: "status",
  type: "type", // "flashcard", "challenge", "final_test"
  xpReward: 0,
};

export const lessonsRelations = {
  unit: "unit",
  challenges: "challenges",
};

export const challengesEnum = ["SELECT", "ASSIST"];

export const challenges = {
  id: 1, // Changed to number
  lessonId: 1, // Changed to number
  type: "type",
  question: "question",
  order: 1,
};

export const challengesRelations = {
  lesson: "lesson",
  challengeOptions: "challengeOptions",
  challengeProgress: "challengeProgress",
};

export const challengeOptions = {
  id: 1, // Changed to number
  challengeId: 1, // Changed to number
  text: "text",
  correct: true,
  imageSrc: "image_src",
  audioSrc: "audio_src",
};

export const challengeOptionsRelations = {
  challenge: "challenge",
};

export const challengeProgress = {
  id: 1, // Changed to number
  userId: 1, // Changed to number
  challengeId: 1, // Changed to number
  completed: false,
};

export const challengeProgressRelations = {
  challenge: "challenge",
};

export const userProgress = {
  userId: 1, // Changed to number
  userName: "user_name",
  userImageSrc: "/mascot.svg",
  activeCourseId: 1, // Changed to number
  hearts: 5,
  points: 0,
};

export const userProgressRelations = {
  activeCourse: "activeCourse",
};

export const userSubscription = {
  id: 1, // Changed to number
  userId: 1, // Changed to number
  stripeCustomerId: "stripe_customer_id",
  stripeSubscriptionId: "stripe_subscription_id",
  stripePriceId: "stripe_price_id",
  stripeCurrentPeriodEnd: "stripe_current_period_end",
};

export const fakeUnits = [
  {
    id: 1, // Changed to number
    title: "Unit 1",
    description: "Description for Unit 1",
    courseId: 1, // Changed to number
    order: 1,
  },
  {
    id: 2, // Changed to number
    title: "Unit 2",
    description: "Description for Unit 2",
    courseId: 1, // Changed to number
    order: 2,
  },
];

export const fakeLessons = [
  {
    id: 1, // Changed to number
    unitId: 1, // Changed to number
    order: 1,
    status: "current",
    type: "flashcard",
    xpReward: 100,
  },
  {
    id: 2, // Changed to number
    unitId: 1, // Changed to number
    order: 2,
    status: "locked",
    type: "challenge",
    xpReward: 0,
  },
  {
    id: 3, // Changed to number
    unitId: 1, // Changed to number
    order: 3,
    status: "locked",
    type: "final_test",
    xpReward: 0,
  },
];