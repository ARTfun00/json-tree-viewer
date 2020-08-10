import React, { useContext } from 'react'
import { UniversalNodesTree } from 'app/components'
import { JsonTreeContext, withJsonTree } from 'app/contexts'
import styled from 'styled-components'

const TreeWrapper = styled.div`
  overflow: auto;
  // max-height: 300px;
  // max-width: 800px;
`

function JsonTreeView({ objectData = null }) {
  const [treeState, setTreeState] = useContext(JsonTreeContext)

  const generalTreeState =
    Object.keys(treeState).length - 1 &&
    Object.values(
      JSON.parse(JSON.stringify({ ...treeState, nextId: undefined }))
    ).some((el) => Boolean(el))

  const handleCollapseOrExpandButtonClick = () => {
    let treeStateMirror = { ...treeState }
    delete treeStateMirror['nextId']

    Object.keys(treeStateMirror).forEach((key) => {
      treeStateMirror[key] = generalTreeState ? false : true
    })

    setTreeState({ ...treeState, ...treeStateMirror })
  }

  return (
    <TreeWrapper>
      {/* <JsonTreeProvider> */}
      {objectData ? (
        <React.Fragment>
          <button onClick={handleCollapseOrExpandButtonClick}>
            {generalTreeState ? 'expand all' : 'collapse all'}
          </button>
          <UniversalNodesTree data={objectData} />
        </React.Fragment>
      ) : (
        <h2>Object data isn't defined</h2>
      )}
      {/* </JsonTreeProvider> */}
    </TreeWrapper>
  )
}

export default withJsonTree(JsonTreeView)
