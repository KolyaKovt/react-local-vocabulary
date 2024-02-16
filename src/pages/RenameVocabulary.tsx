import { FieldValues, SubmitHandler, useForm } from "react-hook-form"

import { VocabularyForm } from "../components/VocabularyForm"
import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch } from "../redux/hooks"
import { Container } from "../components/Container"
import { renameVocabulary } from "../redux/vocabularies/slice"

export default function RenameVocabulary() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit, reset } = useForm()
  const { id } = useParams()

  const submit: SubmitHandler<FieldValues> = async data => {
    if (id) {
      dispatch(
        renameVocabulary({
          name: data.name.trim(),
          id,
        })
      )
    }

    navigate("/")
    reset()
  }

  return (
    <Container>
      <main>
        <section>
          <h1 className="mainTitle mt-6 mb-6">
            Rename the vocabulary
          </h1>
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
