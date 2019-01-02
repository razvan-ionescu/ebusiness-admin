import _ from 'lodash';

export default actions => state => {
  return _(actions).some(action => _.get(state, `loading.${action}`));
};
