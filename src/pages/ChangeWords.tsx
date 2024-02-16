import { useNavigate, useParams } from "react-router-dom"
import { WordForm } from "../components/WordForm"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { Container } from "../components/Container"
import { changeWord, selectVocabularies } from "../redux/vocabularies/slice"
import { getVocabulary } from "../helpers/getVocabulary"

const ChangeWords = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { id, wordId } = useParams()
  const vocabulary = getVocabulary(
    useAppSelector(selectVocabularies),
    id as string
  )

  const { handleSubmit, register, reset } = useForm()

  const submit: SubmitHandler<FieldValues> = async data => {
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
