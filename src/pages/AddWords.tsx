import { WordForm } from "../components/WordForm"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { SubmitHandler, useForm } from "react-hook-form"
import { Container } from "../components/Container"
import { addWord, selectVocabularies } from "../redux/vocabularies/slice"
import { getVocabulary } from "../helpers/getVocabulary"
import { useParams } from "react-router-dom"
import { WordFormData } from "../types"

export default function AddWords() {
  const { id } = useParams()
  const vocabulary = getVocabulary(
    useAppSelector(selectVocabularies),
    id as string
  )
  const dispatch = useAppDispatch()

  const { register, handleSubmit, reset } = useForm<WordFormData>()

  const submit: SubmitHandler<WordFormData> = data => {
    const { word, translation } = data
    dispatch(addWord({ vocabularyId: vocabulary.id, word, translation }))
    reset()
  }

  return (
    <Container>
      <main>
        <h1 className="mainTitle mt-6 mb-6">
          Adding words in: {vocabulary.name}
        </h1>
        <WordForm
          submit={handleSubmit(submit)}
          register={register}
          btnLabel="Add"
        />
      </main>
    </Container>
  )
}
