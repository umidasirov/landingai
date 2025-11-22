// ...existing code...
import robosumo from '../assets/robosumo.png';
import futbol from '../assets/futbol.png';
import ai from '../assets/ai.png';
import constest from '../assets/contest.png';
import idea from '../assets/idea.png';
import React, { createContext, useState, useContext } from "react";

// Block turi
interface Gift {
  name: string;
  count: number;
}

interface BlockType {
  id: number;
  title: string;
  desc: string;
  image: string;
  size: 'small' | 'large';
  link: string;
  gifts?: Gift[]; // bu endi 0 yoki ko‘p sovg‘a bo‘lishi mumkin
}

interface ModalContextType {
  showRegister: boolean;
  setShowRegister: (value: boolean) => void;
  showSubscribe: boolean;
  setShowSubscribe: (value: boolean) => void;
  blocks: BlockType[];
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

const blocks = [
  {
    id: 1,
    title: 'Foydali Ixtirolar',
    desc: 'Yangi g‘oyalarni amalga oshiring.',
    image: idea,
    size: 'small',
    link: '/register/fixtirolar',
    gifts: [
      { name: "Planner", count: 1 },
      { name: "Smart soat", count: 2 },
      { name: "Desk lamp", count: 1 },
    ],
  },
  {
    id: 2,
    title: 'Robo Sumo',
    desc: 'Robotlarning kuchli to‘qnashuv janglari.',
    image: robosumo,
    size: 'small',
    link: '/register/rsumo',
    gifts: [
      { name: "Naushnik", count: 2 },
      { name: "Powerbank", count: 1 },
      { name: "Mini dron", count: 1 },
    ],
  },
  {
    id: 3,
    title: 'DG Contest',
    desc: 'Innovatsion musobaqalar va g‘oyalar.',
    image: constest,
    size: 'small',
    link: '/register/contest',
    gifts: [
      { name: "Klaviatura", count: 1 },
      { name: "Planshet", count: 3 },
      { name: "Smart lamp", count: 2 },
    ],
  },
  {
    id: 4,
    title: 'Robo Futbol',
    desc: 'Robotlar futbol maydonida jang qiladi.',
    image: futbol,
    size: 'small',
    link: '/register/rfutbol',
    gifts: [
      { name: "Mini futbol to‘pi", count: 2 },
      { name: "Naushnik", count: 2 },
      { name: "Water bottle", count: 3 },
    ],
  },
  {
    id: 5,
    title: "AI Texnologiyalar",
    desc: "Sun'iy intellektning yangi chegaralarini kashf qiling.",
    image: ai,
    size: "large",
    link: "/register/ai",
    gifts: [
      { name: "iPhone 17", count: 1 },
      { name: "Planshet", count: 3 },
      { name: "Smart soat", count: 2 },
      { name: "Naushnik", count: 4 },
      { name: "Klaviatura", count: 1 },
    ],
  },
];

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showRegister, setShowRegister] = useState<boolean>(false);
  const [showSubscribe, setShowSubscribe] = useState<boolean>(false);
  return (
    <ModalContext.Provider value={{ showRegister, setShowRegister, blocks, showSubscribe, setShowSubscribe }}>
      {children}
    </ModalContext.Provider>
  );
};
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within ModalProvider");
  }
  return context;
};