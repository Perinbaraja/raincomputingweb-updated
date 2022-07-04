import React, { useEffect } from "react"

//redux
import { useSelector, useDispatch } from "react-redux"

// actions
import { getDemoData } from "../../store/actions"

const Demo = props => {
  const dispatch = useDispatch()
  const { demoData } = useSelector(state => ({
    demoData: state.Demo.demoData,
  }))

  /*
  get data
  */
  useEffect(() => {
    dispatch(getDemoData())
  }, [dispatch])

  // your API's response data will be in events variable.
  console.log(demoData)

  return <div></div>
}

export default Demo
