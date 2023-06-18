import PropTypes from 'prop-types';
import * as S from './Filter.styled';

export const Filter = ({ value, onChangeFilter }) => (
  <>
    <p>Find contacts by name</p>
    <S.Input
      onChange={onChangeFilter}
      value={value}
      name="filter"
      type="text"
    />
  </>
);

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};
