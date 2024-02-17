import { SubmitHandler, useForm } from "react-hook-form"

import { VocabularyForm } from "../components/VocabularyForm"
import { useAppDispatch } from "../redux/hooks"
import { Container } from "../components/Container"
import { addVocabulary } from "../redux/vocabularies/slice"
import { VocabularyFormData } from "../types"

export default function NewVocabulary() {
  const dispatch = useAppDispatch()
  const { register, handleSubmit, reset } = useForm<VocabularyFormData>()

  const submit: SubmitHandler<VocabularyFormData> = data => {
    dispatch(addVocabulary(data.name.trim()))
    reset()
  }

  return (
    <Container>
      <main>
        <section>
          <h1 className="mainTitle mt-6 mb-6">New vocabulary</h1>
          <VocabularyForm
            submit={handleSubmit(submit)}
            register={register}
            btnLabel={"Add"}
          />
        </section>
      </main>
    </Container>
  )
}
