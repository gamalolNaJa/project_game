"use client";

import Link from "next/link";
import { Game, GameFormData } from "@/types/game";
import { initialGames } from "@/data/games";

export default function HomePage() {
  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>บันทึกรายการเกมที่ตั้งใจจะเล่น</h1>
      <p style={{ marginTop: "16px" }}>
        <Link
          href="/games"
          style={{
            padding: "10px 20px",
            backgroundColor: "#0070f3",
            color: "white",
            borderRadius: "6px",
            textDecoration: "none"
          }}
        >
          เพิ่มหรือแก้ไขข้อมูลเกมที่บันทึก
        </Link>
      </p>
      <ul style={{ listStyle: "none", padding: 0, textAlign: "left", paddingTop:"20px" }}>
        {initialGames.map((game) => (
          <li
            key={game.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "6px",
              padding: "12px",
              marginBottom: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <Link
                href={`/games/${game.id}`}
                style={{ fontSize: "18px", fontWeight: "bold", textDecoration: "none", color: "#0070f3" }}
              >
                {game.title}
              </Link>
              <p style={{ margin: "4px 0 0 0", fontSize: "14px", color: "#555" }}>
                แพลตฟอร์ม: {game.platform} | เวลา: {game.expectedHours} ชม. | สถานะ:{" "}
                <strong>{game.status}</strong>
              </p>
            </div>
          </li>
        ))}
      </ul>
     
    </div>
  );
}