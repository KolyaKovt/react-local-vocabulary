import { useCallback, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { Container } from "../components/Container"
import { Header } from "../components/Header"
import { getVocabulary } from "../helpers/getVocabulary"
import { exercise, selectVocabularies } from "../redux/vocabularies/slice"
import { NotEnoughWordsError } from "../components/NotEnoughWordsError"

const countOfStrins = 6
let indecies: number[] = []
let countOfGuessedWords = 0
let correctInd = -1

const GuessingWords = () => {
  const dispatch = useAppDispatch()

  const { id } = useParams()
  const vocabulary = getVocabulary(
    useAppSelector(selectVocabularies),
    id as string
  )

  const [buttonsInds, setButtonsInds] = useState<number[]>([])
  const [wrongInds, setWrongInds] = useState<number[]>([])

  const shuffleArray = useCallback((array: number[]) => {
    for (let i = 0; i < array.length; i++) {
      const element = array[i]
      const randomIndex = getRandomNumber(0, array.length - 1)
      const anotherElement = array[randomIndex]
      array[i] = anotherElement
      array[randomIndex] = element
    }
  }, [])

  const fillButtonsInds = useCallback(() => {
    const rndIndex = getRandomNumber(0, indecies.length - 1)
    correctInd = indecies[rndIndex]
    const l = [indecies[rndIndex]]

    indecies.splice(rndIndex, 1)

    const minimal = Math.min(countOfStrins, vocabulary.firstLang.length)

    for (let i = 1; i < minimal; i++) {
      const rndIndexForButtns = getRandomNumber(
        0,
        vocabulary.firstLang.length - 1
      )

      if (l.includes(rndIndexForButtns) || correctInd === rndIndexForButtns) {
        i--
        continue
      }

      l.push(rndIndexForButtns)
    }

    shuffleArray(l)

    setButtonsInds(l)
  }, [shuffleArray, vocabulary.firstLang.length])

  const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const checkTheAnswer = (i: number) => {
    if (buttonsInds[i] === correctInd) {
      countOfGuessedWords++
      setWrongInds([])
      fillButtonsInds()
    } else {
      if (!wrongInds.includes(i)) setWrongInds(current => [...current, i])
    }

    if (vocabulary.firstLang.length - countOfGuessedWords === 0) {
      setButtonsInds([])
      correctInd = -1
      dispatch(exercise(vocabulary.id))
    }
  }

  const restart = useCallback(() => {
    countOfGuessedWords = 0
    setWrongInds([])
    indecies = vocabulary.firstLang.map((_, i) => i)
    fillButtonsInds()
  }, [fillButtonsInds, vocabulary.firstLang])

  useEffect(() => {
    restart()
  }, [restart])

  const leftWords = vocabulary.firstLang.length - countOfGuessedWords

  if (vocabulary.firstLang.length < 4)
    return <NotEnoughWordsError />

  return (
    <Container>
      <Header full={true}>
        <p className="mainTitle mb-6">
          {leftWords !== 0 ? `Left words: ${leftWords}` : "Nice job!"}
        </p>

        <div className="btnContainer">
          <Link className="btn btn-secondary" to={`/${vocabulary.id}`}>
            Cancel
          </Link>
          <a className="btn btn-success" onClick={restart}>
            Restart
          </a>
        </div>
      </Header>

      <main className="w-[100%]">
        <section>
          <h1 className="visually-hidden">playing guessing words</h1>
          <p className="mb-4 text-2xl text-center">
            {vocabulary.firstLang[correctInd]}
          </p>
          <ul className="wordsColumn">
            {buttonsInds.map((bIndex, i) => (
              <li
                className={"word " + (wrongInds.includes(i) ? "wrong" : "")}
                onClick={() => checkTheAnswer(i)}
                key={i}
              >
                {vocabulary.secLang[bIndex]}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </Container>
  )
}

export default GuessingWords
