import styled from "styled-components";

const StyledTabs = styled.div`
  display: flex;
  gap: 30px;
  margin-bottom: 10px;
`;
const StyledTab = styled.span`
  font-size: 1.3rem;
  cursor: pointer;
  ${(props) =>
    props.active
      ? `
    color:black;
    border-bottom: 2px solid black;
  `
      : `
    color:#999;
  `}
`;

export default function Tabs({ tabs, active, onChange }) {
  return (
    <StyledTabs>
      {tabs.map((tabName, index) => (
        <StyledTab
          key={index}
          onClick={() => {
            onChange(tabName);
          }}
          active={tabName === active}
        >
          {tabName}
        </StyledTab>
      ))}
    </StyledTabs>
  );
}
