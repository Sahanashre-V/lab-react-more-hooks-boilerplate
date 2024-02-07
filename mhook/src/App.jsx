import { useReducer,useRef } from "react";

function reducerFn(state,Action){
  if(Action.type === "Add_new_item"){
    return [...state,{text: Action.payload, isHidden: false}]
  }
  else if(Action.type === "Mapped_Array"){
    return [...Action.payload]
  }
  else{ 
    return state
  }
}

function App(){

  const initialState = []

  const scrollTop = useRef();

  const [state,dispatch] = useReducer(reducerFn,initialState)

  const handleToggle = (id) => {
    let mappedArray = state.map(function(element,index){
      if(id === index){
        return {
          text : element.text,
          isHidden : !element.isHidden
        }
      }
      else{
        return element
      }

    })
    dispatch({type: "Mapped_Array",payload:mappedArray})
  }
  

  return(
    <div>
      <div>

      <input type="text" ref = {scrollTop} onKeyDown={(event) => {
        if(event.key == "Enter")
        dispatch({type: "Add_new_item", payload: event.target.value})

      }}/>
      </div>

      <div>
        {
          state.map(function(element,index){
            return(
              <div className="main background" key={index}>
                <h4>
                  {element.isHidden == true ? "Text is Hidden" : element.text}
                </h4>
                <button className="togglebtn" onClick={() => {
                  handleToggle(index)
                }}>
                  Toggle
                </button>

                </div>
            )
          })
        }
      </div>

      <div className="main">
        <button onClick={() => {
          scrollTop.current.focus()
        }}>
          Focus the input box
        </button>
      </div>
      
    </div>
  )
}

export default App