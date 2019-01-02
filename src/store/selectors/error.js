import _ from 'lodash';

export default actions => state => {
  return (
    _(actions)
      .map(action => _.get(state, `error.${action}`))
      .compact()
      .first() || ''
  );
};
