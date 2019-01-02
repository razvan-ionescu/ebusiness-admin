import { createAction } from 'redux-act';
import { camelCase } from 'lodash';

export default actionTypes => {
  let actions = {};
  Object.keys(actionTypes).forEach(item => {
    actions[camelCase(item)] = createAction(actionTypes[item]);
  });
  return actions;
};
