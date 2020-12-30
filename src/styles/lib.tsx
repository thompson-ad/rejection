// STYLED COMPONENTs
import { Link as RouterLink } from 'react-router-dom';
import styled from '@emotion/styled/macro';

const Link = styled(RouterLink)({
  fontFamily: 'Rubik',
  fontWeight: 500,
  color: '#000',
  ':hover': {
    color: '#000',
    textDecoration: 'underline',
  },
});

export { Link };
