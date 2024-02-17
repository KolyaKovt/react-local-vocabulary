import { Vocabulary } from "../types"

export const getVocabulary = (
  vocabularies: Vocabulary[],
  vocabularyId: string
) => {
  return vocabularies.filter(voc => voc.id === vocabularyId)[0]
}
