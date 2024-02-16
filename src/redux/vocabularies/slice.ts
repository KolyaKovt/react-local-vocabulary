import { createSlice, nanoid } from "@reduxjs/toolkit"
import { Vocabulary } from "../../types/Vocabulary"
import { getVocabulary } from "../../helpers/getVocabulary"

interface State {
  vocabularies: Vocabulary[]
}

const initialState: State = {
  vocabularies: [],
}

const getVocabularyFromState = (state: State, id: string) =>
  getVocabulary(state.vocabularies, id)

const slice = createSlice({
  name: "vocabularies",
  initialState,
  reducers: {
    deleteVocabulary: (state, { payload }: { payload: string }) => {
      state.vocabularies = state.vocabularies.filter(voc => voc.id !== payload)
    },
    addVocabulary: (state, { payload }: { payload: string }) => {
      state.vocabularies.push({
        id: nanoid(),
        name: payload,
        firstLang: [],
        secLang: [],
        wordsIds: [],
        exercise: 0,
      })
    },
    renameVocabulary: (
      state,
      { payload }: { payload: { name: string; id: string } }
    ) => {
      const { id, name } = payload

      const voc = getVocabularyFromState(state, id)
      voc.name = name
    },
    addWord: (
      state,
      {
        payload,
      }: {
        payload: { vocabularyId: string; word: string; translation: string }
      }
    ) => {
      const { word, translation, vocabularyId } = payload

      const voc = getVocabularyFromState(state, vocabularyId)
      voc.firstLang.push(word)
      voc.secLang.push(translation)
      voc.wordsIds.push(nanoid())
    },
    deleteWord: (
      state,
      { payload }: { payload: { vocabularyId: string; wordId: string } }
    ) => {
      const { vocabularyId, wordId } = payload

      const voc = getVocabularyFromState(state, vocabularyId)
      const ind = voc.wordsIds.indexOf(wordId)

      voc.firstLang.splice(ind, 1)
      voc.secLang.splice(ind, 1)
      voc.wordsIds.splice(ind, 1)
    },
    changeWord: (
      state,
      {
        payload,
      }: {
        payload: {
          vocabularyId: string
          wordId: string
          word: string
          translation: string
        }
      }
    ) => {
      const { vocabularyId, wordId, word, translation } = payload

      const voc = getVocabularyFromState(state, vocabularyId)
      const ind = voc.wordsIds.indexOf(wordId)

      voc.firstLang[ind] = word
      voc.secLang[ind] = translation
    },
    exercise: (state, { payload }: { payload: string }) => {
      const voc = getVocabularyFromState(state, payload)
      voc.exercise++
    },
  },
  selectors: {
    selectVocabularies: state => state.vocabularies,
  },
})

export const vocabulariesReducer = slice.reducer

export const {
  deleteVocabulary,
  addVocabulary,
  renameVocabulary,
  addWord,
  deleteWord,
  changeWord,
  exercise,
} = slice.actions

export const { selectVocabularies } = slice.selectors
