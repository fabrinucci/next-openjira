import { UIState } from './';

type UIActionType = 
  | { type: 'UI - Open Sidebar' } 
  | { type: 'UI - Close Sidebar' }
  | { type: 'UI - Add Entry', payload: boolean } 
  | { type: 'UI - Start Dragging' }
  | { type: 'UI - End Dragging' }


export const uiReducer = ( state: UIState, action: UIActionType ): UIState => {

  switch (action.type) {
    case 'UI - Open Sidebar':
      return {
        ...state,
        sidemenuOpen: true,
      }

    case 'UI - Close Sidebar':
      return {
        ...state,
        sidemenuOpen: false,
      }
          
    case 'UI - Add Entry':
      return {
        ...state,
        isAddingEntry: action.payload,
      }

    case 'UI - Start Dragging':
      return {
        ...state,
        isDragging: true,
      }    

    case 'UI - End Dragging':
      return {
        ...state,
        isDragging: false,
      }    

    default:
      return state;
  }

}