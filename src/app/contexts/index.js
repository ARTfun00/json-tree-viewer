import React, { createContext, useState } from 'react'
import nextId from 'react-id-generator'

const JsonTreeContext = createContext([{}, () => {}])

const JsonTreeProvider = (props) => {
  const [treeState, setTreeState] = useState({ nextId: nextId })
  return (
    <JsonTreeContext.Provider value={[treeState, setTreeState]}>
      {props.children}
    </JsonTreeContext.Provider>
  )
}

const withJsonTree = (BaseComponent) => (props) => (
  <JsonTreeProvider>
    <BaseComponent {...props} />
  </JsonTreeProvider>
)

export { JsonTreeContext, JsonTreeProvider, withJsonTree }
