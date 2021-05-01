import styles from './style.module.scss'
import { FiArrowLeft } from 'react-icons/fi'
import { AnimatePresence, motion, useMotionValue } from 'framer-motion'
import { FaTemperatureLow } from 'react-icons/fa'
import { useRouter } from 'next/router'

interface HeaderProps{
  GoBackIsActive : boolean
}

export function Header({ GoBackIsActive} : HeaderProps){
  const router = useRouter()
  const x = useMotionValue(0)
  const variants = {
    active: {
      x : [0, 50]
    },
    disable :{
      x: 0
    }
  }
  return(
    <header className={styles.container}>
      <motion.div className={styles.name}>

        <AnimatePresence>
          {GoBackIsActive && (
            <motion.button 
              onClick={() => router.back()}
              type='button'
              animate={{ 
                display: "block",
                opacity: [0, 1]
              }}
              transition={{ 
                delay: 0.5,
                duration: 0.5, 
                type: 'spring' 
              }}
            >
              <FiArrowLeft size={30} color="#434343"/>
          </motion.button>
          )}    
        
          <motion.h2
            animate={GoBackIsActive ? "active" : "disable"}
            transition={{ 
              bounce: 0.5, 
              duration: 0.5, 
              type: 'spring' 
            }}
            variants={variants}
          >
            Olá, 
          <motion.h2>Gabriel</motion.h2></motion.h2>
        </AnimatePresence>
      </motion.div>

      <div className={styles.userImage}>
        <div></div>
      </div>
    </header>
  )
}
