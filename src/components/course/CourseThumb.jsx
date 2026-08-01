import { BookOpen } from "lucide-react";
import { C } from "../../utils/theme";

export function CourseThumb({ size = 44 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: 11, background: C.amberSoft, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <BookOpen size={Math.round(size * 0.42)} color={C.amberDeep} />
    </div>
  );
}
