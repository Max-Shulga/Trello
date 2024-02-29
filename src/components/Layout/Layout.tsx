import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer.tsx'
import Header from '../Header/Header.tsx'
import styles from './Layout.module.scss'
export default function Layout() {
  return (
    <div className={styles.appContainer}>
      <Header />
      <main className={styles.content}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
