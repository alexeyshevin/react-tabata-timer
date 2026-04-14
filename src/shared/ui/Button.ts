import styled from "styled-components";

type Props = {
  variant?: "start" | "stop" | "reset" | "work" | "rest";
};

export const Button = styled.button<Props>`
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;

  background-color: ${({ variant }) => {
    switch (variant) {
      case "start":
        return "#2563eb";
      case "stop":
        return "#eab308";
      case "reset":
        return "#ef4444";
      case "work":
        return "#3b82f6";
      case "rest":
        return "#22c55e";
      default:
        return "#6b7280";
    }
  }};
`;