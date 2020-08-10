import React from 'react'
import dataSet from '../data/dataSet'
import { JsonTreeView } from 'app/components'

function App() {
  return (
    <React.Fragment>
      <JsonTreeView objectData={dataSet} />
    </React.Fragment>
  )
}

export default App
