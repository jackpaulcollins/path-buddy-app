/* eslint-disable no-unused-expressions */
import {
  string, date, object, array,
} from 'yup';

export const newPathFormSchema = object({
  pathUnits: array().of(
    object().shape({
      name: string().trim().required([1, 'Discipline Name is required']),
      polarity:
        string()
          .oneOf(['positive', 'negative'], [1, 'Path discipline "will" or "will not" must be set'])
          .required('Polarity is required'),
      schedule: string().trim().required([1, 'Path discipline schedule is required']),
    }),
  ),
  pathName: string().required([0, 'Name is required']),
  pathWhy: string().nullable(),
  pathEndDate: date().nullable(),
  pathStartDate: string().required([0, 'Start date is required']),
});

const handleNestedFormHighlight = (action, name) => {
  const matches = name.match(/(\w+)\[(\d+)\]\.(\w+)/);
  const parentElement = document.getElementById(`unit-${matches[2]}`);
  const childElement = parentElement.querySelector(`#${matches[3]}`);

  if (action === 'add') {
    childElement.classList.add('ring-2', 'ring-red-500', 'rounded-md');
  } else {
    childElement.classList.remove('ring-2', 'ring-red-500');
  }
};

export const newPathFormHighlighter = (action, name) => {
  if (name.startsWith('pathUnits')) {
    handleNestedFormHighlight(action, name);
    return;
  }

  let element = document.getElementById(name);

  if (element) {
    action === 'add' ? element.classList.add('ring-red-500') : element.classList.remove('ring-red-500');
    return;
  }

  // annoyingly can't add an id to DatePicker
  element = document.getElementsByClassName(name);
  action === 'add' ? element[0].classList.add('ring-2', 'ring-red-500', 'rounded-md') : element[0].classList.remove('ring-2', 'ring-red-500', 'rounded-md');
};
