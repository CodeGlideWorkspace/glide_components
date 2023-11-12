import React from 'react'
import { Card } from '@/packages/card'

import styles from './Index.module.css'

export default function Index() {
  return (
    <div className={styles.index}>
      Home Page<Card></Card>
    </div>
  )
}
