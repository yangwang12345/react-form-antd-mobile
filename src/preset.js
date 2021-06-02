import { preset as presetRules, util } from '@kne/react-form';
import merge from 'lodash/merge';

export const globalParams = {
  rules: {},
  field: {
    avatar: {
      uploadSender: (file) => {
        console.log(file);
      }
    }
  }
};

export default (props) => {
  merge(globalParams, props);
  presetRules(globalParams.rules);
};