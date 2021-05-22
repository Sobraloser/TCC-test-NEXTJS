import { ElementType, FormEvent, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { AnimatePresence, motion } from 'framer-motion';
import Cookies from 'js-cookie'

import { Header } from '../components/header';
import { LoadingStatus } from '../components/LoadingStatus';
import { api } from '../services/api';

import styles from '../styles/Questionnaire.module.scss'
import { useLoading } from '../contexts/LoadingIcon';
import { useRouter } from 'next/router';

interface TypeProps{
  _id : string;
  name : string;
}
interface QuestionProps{
  body : string;
  _id : string;
  type : TypeProps[]
}

interface changeProps{
  name : string;
  value: string;
}

export default function Questionnaire({ data, questionsID }){
  const history = useRouter()
  const [ isVisible, setIsVisible ] = useState(false)
  const { isLoading, setLoadingTrue, setLoadingFalse } = useLoading()
  const [ questions, setQuestions ] = useState<QuestionProps[]>([])

  const [ questionOne, setQuestionOne ] = useState<number>()
  const [ questionTwo, setQuestionTwo ] = useState<number>()
  const [ questionThree, setQuestionThree ] = useState<number>()
  const [ questionFour, setQuestionFour ] = useState<number>()
  const [ questionFive, setQuestionFive ] = useState<number>()
  const [ questionSix, setQuestionSix ] = useState<number>()

  const [ change, setChange ] = useState<any>(null)

  setLoadingFalse()
  useEffect(()=> {
    setIsVisible(true)
    setQuestions(data)
    history.prefetch('/Home')
    history.prefetch("/Activities")
  },[])

  useEffect(()=> {
    if(change == null){ return }
    for (let i = 0; i < questionsID.length; i++) {
      switch(String(change.name)){
        case String(questionsID[0]) : setQuestionOne(change.value)
        case String(questionsID[1]) : setQuestionTwo(change.value)
        case String(questionsID[2]) : setQuestionThree(change.value)
        case String(questionsID[3]) : setQuestionFour(change.value)
        case String(questionsID[4]) : setQuestionFive(change.value)
        case String(questionsID[5]) : setQuestionSix(change.value)
      }
    }
  },[change])

  const memoizedHeader = useMemo(()=> (
    <Header GoBackIsActive={false}/>
  ),[])
  const memoizedTitle = useMemo(()=> (
    <h2>Permita-nos conhecê-lo(a) <br/> melhor</h2>
  ),[])

  function handleConfirm(){
    const allAnswers = []

    allAnswers.push(Number(questionOne))
    allAnswers.push(Number(questionTwo))
    allAnswers.push(Number(questionThree))
    allAnswers.push(Number(questionFour))
    allAnswers.push(Number(questionFive))
    allAnswers.push(Number(questionSix))
    console.log(allAnswers)
  }

  return(
    <div className={styles.container}>
      {memoizedHeader}
      <AnimatePresence exitBeforeEnter>
        {isVisible && (
          <motion.main
            key="Activities"
            initial={{ opacity: 0, height: 0, y: 50 }}
            animate={{ opacity: 1, height: "fit-content", y: 0}}
            exit={{ opacity: 0}}
          >
            {isLoading && (
              <LoadingStatus/>
            )}
            {memoizedTitle
            }
            {questions.map(question => (
              <div className={styles.questionItem} key={question._id}>
                <span>{question.body}</span>

                <div className={styles.answersContainer} onChange={(event: FormEvent<HTMLInputElement>) => setChange(event.target)}>
                  <div>
                    <input type="radio" id="answer-0" name={question._id} value="0"/>
                    <label htmlFor="answer-0">0</label>
                  </div>
                  <div>
                    <input type="radio" id="answer-1" name={question._id} value="1"/>
                    <label htmlFor="answer-1">1</label>
                  </div>
                  <div>
                    <input type="radio" id="answer-2" name={question._id} value="2"/>
                    <label htmlFor="answer-2">2</label>
                  </div>
                  <div>
                    <input type="radio" id="answer-3" name={question._id} value="3"/>
                    <label htmlFor="answer-3">3</label>
                  </div>
                  <div>
                    <input type="radio" id="answer-4" name={question._id} value="4"/>
                    <label htmlFor="answer-4">4</label>
                  </div>
                  <div>
                    <input type="radio" id="answer-5" name={question._id} value="5"/>
                    <label htmlFor="answer-5">5</label>
                  </div>
                  <div>
                    <input type="radio" id="answer-6" name={question._id} value="6"/>
                    <label htmlFor="answer-6">6</label>
                  </div>
                  <div>
                    <input type="radio" id="answer-7" name={question._id} value="7"/>
                    <label htmlFor="answer-7">7</label>
                  </div>
                  <div>
                    <input type="radio" id="answer-8" name={question._id} value="8"/>
                    <label htmlFor="answer-8">8</label>
                  </div>
                  <div>
                    <input type="radio" id="answer-9" name={question._id} value="9"/>
                    <label htmlFor="answer-9">9</label>
                  </div>
                  <div>
                    <input type="radio" id="answer-10" name={question._id} value="10"/>
                    <label htmlFor="answer-10">10</label>
                  </div>
                </div>
              </div>
            ))}

              <button type="button" onClick={handleConfirm}>
                Continuar
              </button>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const questionsID = []
  const { TCC_APIToken } = ctx.req.cookies

  api.interceptors.request.use(async config => {
    if (TCC_APIToken) {
      config.headers.Authorization = `Bearer ${TCC_APIToken}`;
    }
    return config;
  });

  const { data } = await api.get('/questions')

  data.map((question : QuestionProps)=> {
    questionsID.push(question._id)
  })

  return {
    props: {
      data,
      questionsID
    },
  }
}