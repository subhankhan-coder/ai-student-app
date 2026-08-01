import { C } from "../../utils/theme";

export function Card({ children, style, className = "", ...rest }) {
  return (
    <div className={`asc-fade asc-card-shadow ${className}`} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, ...style }} {...rest}>
      {children}
    </div>
  );
}
