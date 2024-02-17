import { Link, useParams } from "react-router-dom"

export const NotEnoughWordsError = () => {
  const { id } = useParams()

  return (
    <div className="flex flex-col gap-4 items-center justify-center w-[100vw] h-[100vh] px-5">
      <h1 className="text-center">
        The vocabulary must contain at least 4 words to play.
      </h1>

      <Link className="btn btn-secondary" to={`/${id}`}>
        Back
      </Link>
    </div>
  )
}
