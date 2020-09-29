import React from "react";
import styles from '@/styles/a.module.css'   // 局部
import '@/styles/a.css'   // 全局

function Home() {
  console.log(styles)
  return <div>
    <h1 className='a'>Home</h1>
    <div className={styles.a}>styles</div>
  </div>
}

export default Home
