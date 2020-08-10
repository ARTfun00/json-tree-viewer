import React, { useState, useEffect, useRef, useContext } from 'react'
import styled from 'styled-components'
import { JsonTreeContext } from 'app/contexts'

const StyledButton = styled.button`
  width: 15px;
  height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 16px;
`
const StyledFlexDiv = styled.div`
  display: flex;
  align-items: center;
`

function isObject(variable) {
  const dataType = typeof variable
  return dataType === 'function' || (dataType === 'object' && !!variable)
}

const UniversalNodesTree = (props) => {
  const { data } = props
  const isDataTypeObject = isObject(data)
  const isDataTypeArray = isDataTypeObject && Array.isArray(data)

  const [nodeCompressionState, setNodeCompressionState] = useState(false)
  const uniqueNodeId = useRef(null)
  const [treeState, setTreeState] = useContext(JsonTreeContext)

  useEffect(() => {
    if (!uniqueNodeId.current) {
      let uniqueId = treeState.nextId()
      uniqueNodeId.current = uniqueId
      setTreeState((oldState) => ({
        ...oldState,
        [uniqueId]: nodeCompressionState
      }))
    } else {
      if (nodeCompressionState !== treeState[uniqueNodeId.current])
        setNodeCompressionState(treeState[uniqueNodeId.current])
    }
  }, [treeState, setTreeState, nodeCompressionState])

  const handleCompressionButtonClick = (e) => {
    setNodeCompressionState(!nodeCompressionState)
    setTreeState((oldState) => ({
      ...oldState,
      [uniqueNodeId.current]: !nodeCompressionState
    }))
  }

  return (
    <div
      style={{
        display: nodeCompressionState ? 'flex' : 'block'
      }}>
      <StyledFlexDiv className="braces">
        <span>{isDataTypeArray ? '[' : '{'}</span>
        <StyledButton onClick={handleCompressionButtonClick}>
          {nodeCompressionState ? '+' : '-'}
        </StyledButton>
      </StyledFlexDiv>

      <div
        style={{
          margin: '0 16px',
          display: !nodeCompressionState ? 'block' : 'none'
        }}>
        {isDataTypeArray
          ? data.map((obj) => (
              <UniversalNodesTree data={obj} key={JSON.stringify(obj)} />
            ))
          : Object.keys(data).map((key) => (
              <div
                key={`${key}-${JSON.stringify(data[key])}`}
                style={{ display: 'flex' }}>
                <span>
                  "<b>{key}</b>"
                  <span style={{ marginLeft: '4px', marginRight: '8px' }}>
                    :
                  </span>
                </span>
                <div>
                  {isObject(data[key]) ? (
                    <UniversalNodesTree data={data[key]} />
                  ) : (
                    data[key]
                  )}
                </div>
              </div>
            ))}
      </div>
      <span className="braces">{isDataTypeArray ? ']' : '}'}</span>
    </div>
  )
}

export default UniversalNodesTree
