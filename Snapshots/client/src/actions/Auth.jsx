import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index.js";

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });
    navigate("/");
  } catch (error) {
    console.error(error.response);
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });
    navigate("/");
  } catch (error) {
    console.error(error.response);
  }
};


// Redux workflow

// First we get to the actual form, the form is a component, Here it is the Auth. Once we fill in all the inputs
// in the form, we need to dispatch the action, the action can be signup or signin. For dispatching we give
// formData and navigate as the inputs. Then we go to the actions Auth.jsx in the actions folder. There we will
// dispatch the actions. In the actions, we make another call to the api. In api, we make post request to the database.
// Hey database, get me some data and return it to me. That's what we do in actions where we dispatch the signIn or
// signUp formData and store them in the data variable. Finally, from the action creator we dispatch some actions,
// and then we come into our reducers.
