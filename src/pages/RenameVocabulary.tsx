import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"

import { VocabularyForm } from "../components/VocabularyForm"
import { Container } from "../components/Container"

import { useAppDispatch, useAppSelector } from "../redux/hooks"
import {
  renameVocabulary,
  selectVocabularies,
} from "../redux/vocabularies/slice"
import { getVocabulary } from "../helpers/getVocabulary"
import { VocabularyFormData } from "../types"

export default function RenameVocabulary() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { id } = useParams()
  const vocabulary = getVocabulary(
    useAppSelector(selectVocabularies),
    id as string
  )

  const { register, handleSubmit, reset } = useForm<VocabularyFormData>({
    defaultValues: {
      name: vocabulary.name,
    },
  })

  const submit: SubmitHandler<VocabularyFormData> = async data => {
    dispatch(
      renameVocabulary({
        name: data.name.trim(),
        id: vocabulary.id,
      })
    )

    navigate("/")
    reset()
  }

  return (
    <Container>
      <main>
        <section>
          <h1 className="mainTitle mt-6 mb-6">Rename the vocabulary</h1>
          <VocabularyForm
            submit={handleSubmit(submit)}
            register={register}
            btnLabel={"Rename"}
          />
        </section>
      </main>
    </Container>
  )
}
