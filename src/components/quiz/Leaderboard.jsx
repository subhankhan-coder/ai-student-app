import { Trophy } from "lucide-react";
import { Card } from "../ui/Card";
import { Pill } from "../ui/Pill";
import { EmptyState } from "../ui/EmptyState";
import { LEADERBOARD_PEERS } from "../../data/leaderboardPeers";
import { C } from "../../utils/theme";
import { useData } from "../../hooks/useData";
import { useAuth } from "../../hooks/useAuth";

export function Leaderboard() {
  const { quizHistory, quizzes } = useData();
  const { user } = useAuth();

  const scores = quizHistory.map((h) => h.score).concat(quizzes.filter((q) => q.bestScore != null).map((q) => q.bestScore));
  const myScore = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null;

  if (myScore === null) {
    return <Card style={{ padding: 20 }}><EmptyState icon={Trophy} title="No scores yet" body="Take a quiz to appear on the leaderboard." /></Card>;
  }

  const rows = [...LEADERBOARD_PEERS, { name: user.name || "You", score: myScore, isMe: true }].sort((a, b) => b.score - a.score);

  return (
    <Card style={{ overflow: "hidden" }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: C.rowHover, borderBottom: `1px solid ${C.border}` }}>
              <th style={{ textAlign: "left", padding: "11px 16px", fontSize: 11, fontWeight: 700, color: C.slate }}>RANK</th>
              <th style={{ textAlign: "left", padding: "11px 16px", fontSize: 11, fontWeight: 700, color: C.slate }}>STUDENT</th>
              <th style={{ textAlign: "left", padding: "11px 16px", fontSize: 11, fontWeight: 700, color: C.slate }}>AVG. SCORE</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.name} className="asc-row" style={{ borderBottom: `1px solid ${C.border}`, background: r.isMe ? C.chatBubble : "transparent" }}>
                <td style={{ padding: "11px 16px", fontWeight: 700 }}>{i === 0 ? <Trophy size={14} color={C.amberDeep} style={{ display: "inline", verticalAlign: -2, marginRight: 4 }} /> : null}#{i + 1}</td>
                <td style={{ padding: "11px 16px", fontWeight: r.isMe ? 700 : 500 }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>{r.name}{r.isMe && <Pill tone="amber">You</Pill>}</span>
                </td>
                <td style={{ padding: "11px 16px" }}>{r.score}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
