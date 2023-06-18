import { ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import * as S from './FormError.styled';

export const FormError = ({ name }) => {
  return (
    <ErrorMessage
      name={name}
      render={message => <S.ErrorText>{message}</S.ErrorText>}
    />
  );
};

FormError.propTypes = {
  name: PropTypes.string.isRequired,
};
