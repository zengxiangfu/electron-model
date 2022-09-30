import { useReducer } from "react";
import Header from './header'
import Content from './content'
import {ETabActive, TState, TAction } from './contants'

const initialState: TState = {
  tabActive: ETabActive.PERINSTALL
}
const reducer = (state: any, action: TAction) => {
  switch (action.type) {
    case 'changeTabActive':
      return { ...state, tabActive: action.data }
  }
}

export default function Index() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return <div>
    <Header dispatch={dispatch} />
    <Content tabActive={state.tabActive} />
  </div>
}
