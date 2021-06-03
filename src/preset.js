import { preset as presetRules, util } from '@kne/react-form';
import merge from 'lodash/merge';

export const globalParams = {
  rules: {},
  field: {
    avatar: {
      uploadSender: (file) => {
        console.log(file);
        return file;
      }
    },
    imagePicker: {
      uploadSender: (file) => {
        console.log(file);
        return file;
      }
    }
  }
};

export default (props) => {
  merge(globalParams, props);
  presetRules(globalParams.rules);
};