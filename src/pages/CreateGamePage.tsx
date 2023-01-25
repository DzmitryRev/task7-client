import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateGamePage({ name }: { name: string }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!name) {
      navigate("/login");
    }
  }, []);
  return <div>// Кпока создать игру -- редирект на игру</div>;
}
