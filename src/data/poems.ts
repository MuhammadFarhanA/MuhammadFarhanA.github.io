export interface Poem {
  id: number;
  title: string;
  content: string[];
  date: string;
}

export const poems: Poem[] = [
  {
    id: 1,
    title: "Digital Dreams",
    content: [
      "In lines of code, I find my voice,",
      "Each function call, a conscious choice.",
      "Variables dance in memory's hall,",
      "While algorithms answer logic's call.",
      "",
      "The screen glows bright with possibility,",
      "As syntax flows with agility.",
      "In this digital realm I've made my home,",
      "Where thoughts compile and ideas roam."
    ],
    date: "March 2024"
  },
  {
    id: 2,
    title: "The Writer's Paradox",
    content: [
      "Words flow like water from my pen,",
      "Yet sometimes drought consumes me when",
      "The blank page stares with hollow eyes,",
      "And inspiration slowly dies.",
      "",
      "But in the silence, seeds take root,",
      "And from the void springs tender fruit.",
      "For every writer knows the truth:",
      "Creation needs both age and youth."
    ],
    date: "February 2024"
  },
  {
    id: 3,
    title: "Midnight Debugging",
    content: [
      "The clock strikes twelve, the world sleeps sound,",
      "But here I sit, by errors bound.",
      "A semicolon out of place,",
      "Has brought my program to disgrace.",
      "",
      "Line by line, I trace the flow,",
      "Seeking bugs that hide below.",
      "In coffee's warmth and screen's blue light,",
      "I'll code until the morning bright."
    ],
    date: "January 2024"
  },
  {
    id: 4,
    title: "Between the Lines",
    content: [
      "Between the lines of code I write,",
      "Live stories waiting for their light.",
      "Each comment holds a whispered thought,",
      "Each function, battles I have fought.",
      "",
      "The user sees the polished face,",
      "But never knows the hidden grace",
      "Of countless hours spent in care,",
      "To make it seem like magic's there."
    ],
    date: "December 2023"
  },
  {
    id: 5,
    title: "Version Control",
    content: [
      "Like chapters in a living book,",
      "Each commit tells where I took",
      "A different path, a new approach,",
      "As deadlines made their slow approach.",
      "",
      "Git remembers every change,",
      "The history we rearrange.",
      "In branches we explore and grow,",
      "Then merge the paths we've come to know."
    ],
    date: "November 2023"
  },
  {
    id: 6,
    title: "The Art of Simplicity",
    content: [
      "In complexity, we often hide",
      "The simple truths that live inside.",
      "A single line can say it all,",
      "While verbose code begins to fall.",
      "",
      "The master knows that less is more,",
      "That elegance opens every door.",
      "In poetry and code alike,",
      "Precision is what we should strike."
    ],
    date: "October 2023"
  }
];