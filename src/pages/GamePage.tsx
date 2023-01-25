import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GamePage({ name }: { name: string }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!name) {
      navigate("/login");
    }
  }, []);
  
  return <div>
    // Если не залогинен то идем на логин пэйдж -- оттуда редирект назад на игру 
    // Вытгиваем query парам из url
    // Подключаемся к игре
    // TODO: нужно определить создателя комнаты и у создателя есть кнопка удалить игру
    // В UI обаратываем 2 юзера -- больше нельзя
    // Если юзер выходит - горит оффлайн флаг
    
  </div>;
}
