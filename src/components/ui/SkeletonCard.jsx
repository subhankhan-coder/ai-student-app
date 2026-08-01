import { Card } from "./Card";

export function SkeletonCard() {
  return (
    <Card style={{ padding: 18 }}>
      <div className="asc-skeleton" style={{ width: 40, height: 40, borderRadius: 10, marginBottom: 14 }} />
      <div className="asc-skeleton" style={{ width: "60%", height: 11, borderRadius: 4, marginBottom: 10 }} />
      <div className="asc-skeleton" style={{ width: "90%", height: 15, borderRadius: 4, marginBottom: 8 }} />
      <div className="asc-skeleton" style={{ width: "40%", height: 11, borderRadius: 4, marginBottom: 16 }} />
      <div className="asc-skeleton" style={{ width: "100%", height: 34, borderRadius: 8 }} />
    </Card>
  );
}
