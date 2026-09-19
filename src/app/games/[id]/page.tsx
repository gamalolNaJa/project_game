import { notFound } from "next/navigation";
import Link from "next/link";
import { initialGames } from "@/data/games";
import { Metadata } from "next";

type Props = {
    params: Promise<{ id: string }>;
};


export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const game = initialGames.find((g) => g.id === Number(resolvedParams.id));

    if (!game) {
        return {
            title: "ไม่พบข้อมูลเกม",
        };
    }

    return {
        title: `${game.title} - Game Details`,
    };
}

export default async function GameDetailPage({ params }: Props) {
    const resolvedParams = await params;
    const gameId = Number(resolvedParams.id);
    const game = initialGames.find((g) => g.id === gameId);

  
    if (!game) {
        notFound();
    }

    return (
        <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px" }}>
            <Link href="/games">← กลับไปหน้าแรก</Link>
            <h1 style={{ marginTop: "20px" }}>{game.title}</h1>
            <div
                style={{
                    border: "1px solid #ddd",
                    padding: "20px",
                    borderRadius: "8px",
                    marginTop: "16px",
                }}
            >
                <p><strong>รหัสเกม (ID):</strong> {game.id}</p>
                <p><strong>แพลตฟอร์ม:</strong> {game.platform}</p>
                <p><strong>เวลาที่คาดว่าจะใช้เล่น:</strong> {game.expectedHours} ชั่วโมง</p>
                <p><strong>สถานะปัจจุบัน:</strong> {game.status}</p>
            </div>
        </div>
    );
}