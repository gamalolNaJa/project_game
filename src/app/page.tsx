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
     
    </div>
  );
}