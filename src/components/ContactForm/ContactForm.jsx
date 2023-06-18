import { Formik } from 'formik';
import * as yup from 'yup';
import { FormError } from 'components/FormError';
import PropTypes from 'prop-types';
import * as S from './ContactForm.styled';

const validatePattern = {
  name: /^(?!^\s+$)[\sa-zA-Zа-яА-ЯґҐєЄіІїЇ]+((['-][\sa-zA-Zа-яА-ЯґҐєЄіІїЇ]+)([ ]?[\sa-zA-Zа-яА-ЯґҐєЄіІїЇ]+))*$/,
  number:
    /^\+?\d{1,4}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
};

const errorMessage = {
  name: "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan",
  number:
    'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +',
};

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(validatePattern.name, errorMessage.name)
    .required(),
  number: yup
    .string()
    .matches(validatePattern.number, errorMessage.number)
    .required(),
});

const initialValues = {
  name: '',
  number: '',
};

export const ContactForm = ({ onSubmit }) => {
  const handleSubmit = (values, { resetForm }) => {
    onSubmit(values);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <S.ContactForm autoComplete="off">
        <S.Label>
          Name
          <S.Input type="text" name="name" />
          <FormError name="name" />
        </S.Label>

        <S.Label>
          Number
          <S.Input type="tel" name="number" />
          <FormError name="number" />
        </S.Label>

        <S.Button type="submit">Add contact</S.Button>
      </S.ContactForm>
    </Formik>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
