import { useEffect, useState } from "react"

function Calification(props) {
  const {range, calification} = props
  const [startsForDisplay, setStartsForDisplay] = useState([])

  const getStarts = () => {
    const starts = []
    for (let index = 0; index < range; index++) {
      const start = {
        index: index
      }
      starts.push(start)
    }
    return starts
  }

  useEffect(() => {
    setStartsForDisplay(getStarts())
  }, [])

  return (
    <div>
      {
        startsForDisplay.map((start) => {
          const {index} = start
          return (
            <span key={index} className="fa fa-star" style={{ color: calification > index && 'orange' }}></span>
          )
        })
      }
    </div>
  )
}

export default Calification
