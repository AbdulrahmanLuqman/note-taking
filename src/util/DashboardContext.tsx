import { createContext, useContext, useReducer, ReactNode, Reducer } from "react";

interface State {
    showSideBar: boolean
}

interface Action {
    type: string,
    payload?: string | boolean | object
}

type Dispatch = (action: Action)=> void

interface DashboardProviderProps {
    children: ReactNode
}

const initialState = { showSideBar: false }

const DashboardStateContext = createContext<State | undefined>(undefined)
const DashboardDispatchContext = createContext<Dispatch | undefined>(undefined)

const DashboardReducer = (state: State, action: Action)=> {
    const { type, payload } = action

    switch(type) {
        case "showSideBar": {
            return { ...state, showSideBar: !state.showSideBar }
        }

        default: return state
    }
}

export const DashboardProvider = ({children}: DashboardProviderProps)=> {
    const [state, dispatch] = useReducer<Reducer<State, Action>>(DashboardReducer, initialState)

    return (
        <DashboardStateContext.Provider value={state}>
            <DashboardDispatchContext.Provider value={dispatch}>
                {children}
            </DashboardDispatchContext.Provider>
        </DashboardStateContext.Provider>
    )
}

export const useDashboardState = ()=> {
    const context = useContext(DashboardStateContext)
    if(!context) throw new Error("This component is outside Dashboard context provider")

    return context
}

export const useDashboardDispatch = ()=> {
    const context = useContext(DashboardDispatchContext)
    if(!context) throw new Error("This component is used outside Dashboard context provider")

    return context
}