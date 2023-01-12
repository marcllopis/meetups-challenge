import styled from "styled-components";

const StyledCard = styled.section`
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

export default function Card({ children }) {
  return <StyledCard>{children}</StyledCard>;
}
