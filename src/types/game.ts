export type GameStatus = "ยังไม่เริ่ม" | "กำลังเล่น" | "เล่นจบแล้ว";

export type Game = {
  id: number;
  title: string;
  platform: string;
  expectedHours: number;
  status: GameStatus;
};


export type GameFormData = {
  title: string;
  platform: string;
  expectedHours: string;
  status: GameStatus;
};