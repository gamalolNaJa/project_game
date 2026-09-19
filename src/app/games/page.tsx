"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { Game, GameFormData } from "@/types/game";
import { initialGames } from "@/data/games";

export default function GamesPage() {
    const [games, setGames] = useState<Game[]>(initialGames);
    const [editingId, setEditingId] = useState<number | null>(null);

    const [formData, setFormData] = useState<GameFormData>({
        title: "",
        platform: "",
        expectedHours: "",
        status: "ยังไม่เริ่ม",
    });

    const [errors, setErrors] = useState<{
        title?: string;
        platform?: string;
        expectedHours?: string;
    }>({});

    function handleChange(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    function validateForm() {
        const newErrors: { title?: string; platform?: string; expectedHours?: string } = {};

        if (!formData.title.trim()) {
            newErrors.title = "กรุณากรอกชื่อเกม";
        }

        if (!formData.platform) {
            newErrors.platform = "กรุณาเลือกแพลตฟอร์ม";
        }

        const hoursNumber = Number(formData.expectedHours);
        if (
            !formData.expectedHours ||
            isNaN(hoursNumber) ||
            hoursNumber <= 0 ||
            !Number.isInteger(hoursNumber)
        ) {
            newErrors.expectedHours = "จำนวนชั่วโมงต้องเป็นจำนวนเต็มบวก";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if (!validateForm()) return;

        if (editingId !== null) {
            setGames((prev) =>
                prev.map((game) =>
                    game.id === editingId
                        ? {
                            ...game,
                            title: formData.title.trim(),
                            platform: formData.platform,
                            expectedHours: Number(formData.expectedHours),
                            status: formData.status,
                        }
                        : game
                )
            );
            setEditingId(null);
        } else {
            const newGame: Game = {
                id: Date.now(),
                title: formData.title.trim(),
                platform: formData.platform,
                expectedHours: Number(formData.expectedHours),
                status: formData.status,
            };
            setGames((prev) => [...prev, newGame]);
        }

        setFormData({
            title: "",
            platform: "",
            expectedHours: "",
            status: "ยังไม่เริ่ม",
        });
    }

    function handleEdit(game: Game) {
        setEditingId(game.id);
        setFormData({
            title: game.title,
            platform: game.platform,
            expectedHours: String(game.expectedHours),
            status: game.status,
        });
        setErrors({});
    }

    function handleDelete(id: number) {
        setGames((prev) => prev.filter((game) => game.id !== id));
        if (editingId === id) {
            setEditingId(null);
            setFormData({
                title: "",
                platform: "",
                expectedHours: "",
                status: "ยังไม่เริ่ม",
            });
        }
    }

    function handleCancelEdit() {
        setEditingId(null);
        setFormData({
            title: "",
            platform: "",
            expectedHours: "",
            status: "ยังไม่เริ่ม",
        });
        setErrors({});
    }

    return (
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
            <h1>เพิ่มหรือแก้ไขข้อมูลเกมที่บันทึก</h1>
            <div style={{
                background: "red",
                borderRadius: "5px",
                width: "150px"
            }}><a href="/">กลับไปหน้าแรก</a></div>


            <form
                onSubmit={handleSubmit}
                style={{
                    background: "#f4f4f4",
                    padding: "20px",
                    borderRadius: "8px",
                    marginBottom: "30px",
                    color: "#333",
                }}
            >
                <h2>{editingId !== null ? "แก้ไขรายการเกม" : "เพิ่มเกมใหม่"}</h2>

                <div style={{ marginBottom: "12px" }}>
                    <label>ชื่อเกม: </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        style={{
                            width: "100%", padding: "8px", marginTop: "4px",
                            border:"1px solid black",borderRadius:"5px"
                        }}
                    />
                    {errors.title && (
                        <span style={{ color: "red", fontSize: "14px" }}>{errors.title}</span>
                    )}
                </div>

                <div style={{ marginBottom: "12px" }}>
                    <label>แพลตฟอร์ม: </label>
                    <select
                        name="platform"
                        value={formData.platform}
                        onChange={handleChange}
                        style={{ width: "100%", padding: "8px", marginTop: "4px" ,border:"1px solid black",borderRadius:"5px"}}
                    >
                        <option value="">-- เลือกแพลตฟอร์ม --</option>
                        <option value="PC">PC</option>
                        <option value="PlayStation 5">PlayStation 5</option>
                        <option value="Xbox Series X">Xbox Series X</option>
                        <option value="Nintendo Switch">Nintendo Switch</option>
                    </select>
                    {errors.platform && (
                        <span style={{ color: "red", fontSize: "14px" }}>{errors.platform}</span>
                    )}
                </div>

                <div style={{ marginBottom: "12px" }}>
                    <label>จำนวนชั่วโมงที่คาดว่าจะเล่น: </label>
                    <input
                        type="number"
                        name="expectedHours"
                        value={formData.expectedHours}
                        onChange={handleChange}
                        style={{ width: "100%", padding: "8px", marginTop: "4px",border:"1px solid black",borderRadius:"5px" }}
                    />
                    {errors.expectedHours && (
                        <span style={{ color: "red", fontSize: "14px" }}>
                            {errors.expectedHours}
                        </span>
                    )}
                </div>

                <div style={{ marginBottom: "12px" }}>
                    <label>สถานะ: </label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        style={{ width: "100%", padding: "8px", marginTop: "4px" ,border:"1px solid black",borderRadius:"5px"}}
                    >
                        <option value="ยังไม่เริ่ม">ยังไม่เริ่ม</option>
                        <option value="กำลังเล่น">กำลังเล่น</option>
                        <option value="เล่นจบแล้ว">เล่นจบแล้ว</option>
                    </select>
                </div>

                <button type="submit" style={{ padding: "8px 16px", cursor: "pointer",border:"1px solid black",borderRadius:"5px" }}>
                    {editingId !== null ? "บันทึกการแก้ไข" : "เพิ่มเกม"}
                </button>
                {editingId !== null && (
                    <button
                        type="button"
                        onClick={handleCancelEdit}
                        style={{ marginLeft: "8px", padding: "8px 16px", cursor: "pointer",border:"1px solid black",borderRadius:"5px" }}
                    >
                        ยกเลิก
                    </button>
                )}
            </form>

            <h2>รายการเกมทั้งหมด ({games.length})</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {games.map((game) => (
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
                                style={{ fontSize: "18px", fontWeight: "bold" }}
                            >
                                {game.title}
                            </Link>
                            <p style={{ margin: "4px 0 0 0", fontSize: "14px" }}>
                                แพลตฟอร์ม: {game.platform} | เวลา: {game.expectedHours} ชม. | สถานะ:{" "}
                                <strong>{game.status}</strong>
                            </p>
                        </div>
                        <div>
                            <button
                                type="button"
                                onClick={() => handleEdit(game)}
                                style={{ marginRight: "8px", padding: "6px 12px", cursor: "pointer" }}
                            >
                                แก้ไข
                            </button>
                            <button
                                type="button"
                                onClick={() => handleDelete(game.id)}
                                style={{
                                    padding: "6px 12px",
                                    backgroundColor: "#ff4d4f",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                }}
                            >
                                ลบ
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}