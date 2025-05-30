export interface QuestionOption {
  label: string;
  text: string;
  rawScore: number;
}

export interface Question {
  id: number;
  text: string;
  options: QuestionOption[]; 
}

export interface Answer {
  questionId: number;
  selectedOption: string;
}

export type QuestionsData = Question[];
export type AnswersData = Answer[];