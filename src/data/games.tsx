import { Game } from "@/types/game";

export const initialGames: Game[] = [
  {
    id: 1,
    title: "Elden Ring",
    platform: "PC",
    expectedHours: 100,
    status: "กำลังเล่น",
  },
  {
    id: 2,
    title: "The Legend of Zelda: Tears of the Kingdom",
    platform: "Nintendo Switch",
    expectedHours: 120,
    status: "เล่นจบแล้ว",
  },
  {
    id: 3,
    title: "Final Fantasy VII Rebirth",
    platform: "PlayStation 5",
    expectedHours: 80,
    status: "ยังไม่เริ่ม",
  },
  {
    id: 4,
    title: "Cyberpunk 2077",
    platform: "PC",
    expectedHours: 60,
    status: "เล่นจบแล้ว",
  },
  {
    id: 5,
    title: "Hades II",
    platform: "PC",
    expectedHours: 45,
    status: "ยังไม่เริ่ม",
  },
];