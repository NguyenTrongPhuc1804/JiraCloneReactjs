const initialState = {
  component: <p>NOi dung mac dinh</p>,
};

const ModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_FORM": {
      state.component = action.Component;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
export default ModalReducer;
