import styled from 'styled-components';

export const Container = styled.div`
  padding: 3rem 4rem;
  width: 26.5rem;
  height: 100vh;

  background: var(--purple-500);
  color: var(--white);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  header {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  strong {
    font-family: Lexend, sans-serif;
    font-weight: 600;
  }

`;

export const EmptyPlayer = styled.div`
  width: 100%;
  height: 20rem;
  border: 2px dashed var(--purple-300);
  border-radius: 1.5rem;
  background: linear-gradient(143.8deg, rgba(145, 100, 250, 0.8) 0%, rgba(0, 0, 0, 0) 100%);

  padding: 4rem;
  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;
`;