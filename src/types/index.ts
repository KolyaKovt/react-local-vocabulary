export interface Vocabulary {
  id: string
  name: string
  firstLang: string[]
  secLang: string[]
  wordsIds: string[]
  exercise: number
}

export interface VocabularyFormData {
  name: string
}

export interface WordFormData {
  word: string
  translation: string
}
