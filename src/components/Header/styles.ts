import styled from 'styled-components';

export const Container = styled.div`
  background: ${props => props.theme.colors.primary};
  height: 6.5rem;

  display: flex;
  align-items: center;

  padding: 2rem 4rem;

  border-bottom: 1px solid ${props => props.theme.colors.border};

  p {
    margin-left: 2rem;
    padding: 0.25rem 0 0.25rem 2rem;
    border-left: 1px solid ${props => props.theme.colors.primaryText};
    color: ${props => props.theme.colors.primaryText}
  }

  span {
    margin-left: auto;
    text-transform: capitalize;
    margin-right: 1.5rem;
    color: ${props => props.theme.colors.primaryText}
  }
`