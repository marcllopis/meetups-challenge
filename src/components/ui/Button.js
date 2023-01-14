import styled from "styled-components";

const StyledButton = styled.button`
  font: inherit;
  cursor: pointer;
  color: #77002e;
  border: 1px solid #77002e;
  background-color: transparent;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  &:hover,
  &:active {
    background-color: #ffe2ed;
  }
`;

export default function Button({ text, action, id }) {
  return (
    <StyledButton data-testid={id} onClick={action}>
      {text}
    </StyledButton>
  );
}
