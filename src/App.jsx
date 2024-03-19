import { useEffect, useState } from 'react'
import './App.css'

const FollowMouse = () => {

  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // pointer move
  useEffect(() => {
    console.log('effect');
    const handleMove = (event) => {
      const { clientX, clientY } = event;
      // console.log('handlemove', { clientX, clientY });
      setPosition({ x: clientX, y: clientY });
    }

    // pointermove: evento que sucede cuando se mueve el mouse
    if (enabled) window.addEventListener('pointermove', handleMove);


    // limpiango subscripciones(eventos), limpia el efecto anterior, empezamos desde cero
    // Cuando se ejecuta?
    // * al inicio, cuando se renderiza el componente
    // * cada que se monte el componente (aparece)
    // * se ejecuta antes de que se desmonte el componente 
    // * cada vez que cambie la dependencia (enabled), antes de ejecutar el cambio
    
    // si no se limipa se crea subscripciones encima del anterior! PROBLEMA! ❌
    // getEventListeners(window) -> con esto se puede ver la cantidad de subscripciones, solo funciona en la consola de chrome  
    return () => {
      console.log('cambio enable o ya no se muestra followMouse');
      window.removeEventListener('pointermove', handleMove)
    }

  }, [enabled])


  // change body className
  /**
   * [] -> solo se ejecuta cuando se monta el componente
   * [enabled] -> solo se ejecuta cuando cambia enabled y cuando se monta el componente
   * undefined -> se ejecuta cada vez que se renderiza el componente (se cambia cualquier estado)
   */
  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled);

    return (() => {
      document.body.classList.remove('no-cursor');
    })
  }, [enabled])

  return (
    <>
      <div style={{
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        border: '1px solid #fff',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -25,
        top: -25,
        width: 50,
        height: 50,
        transform: `translate(${position.x}px, ${position.y}px)`
      }} />
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Desactivar' : 'Activar'} seguir puntero
      </button>
    </>
  )
}

function App() {


  return (
    <main>
      <FollowMouse />
    </main>
  )
}

export default App
