'use client'
import style from './home.module.css'
export const Home = () => {
  return (
    <div>
      <h1 className={style.mensaje}>
        Arrastra una tarjeta aquí para ver más detalles
      </h1>
    </div>
  )
}
