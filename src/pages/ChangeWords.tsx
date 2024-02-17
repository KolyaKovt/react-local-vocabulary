import { useNavigate, useParams } from "react-router-dom"
import { SubmitHandler, useForm } from "react-hook-form"

import { WordForm } from "../components/WordForm"
import { Container } from "../components/Container"

import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { changeWord, selectVocabularies } from "../redux/vocabularies/slice"
import { getVocabulary } from "../helpers/getVocabulary"
import { WordFormData } from "../types"

const ChangeWords = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { id, wordId } = useParams()
  const vocabulary = getVocabulary(
    useAppSelector(selectVocabularies),
    id as string
  )

  const wordIndex = vocabulary.wordsIds.indexOf(wordId as string)
  const word = vocabulary.firstLang[wordIndex]
  const translation = vocabulary.secLang[wordIndex]

  const { handleSubmit, register, reset } = useForm<WordFormData>({
    defaultValues: {
      word,
      translation,
    },
  })

  const submit: SubmitHandler<WordFormData> = async data => {
    if (id && wordId) {
      dispatch(
        changeWord({
          vocabularyId: id,
          wordId: wordId,
          word: data.word,
          translation: data.translation,
        })
      )
    }

    reset()
    navigate(`/${id}`)
  }

  return (
    <Container>
      <main>
        <h1 className="mainTitle mt-6 mb-6">
          Changing words in: {vocabulary.name}
        </h1>
        <WordForm
          submit={handleSubmit(submit)}
          register={register}
          btnLabel="Change"
        />
      </main>
    </Container>
  )
}

export default ChangeWords
