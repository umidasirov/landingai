// ...existing code...
import robosumo from '../assets/robosumo.png';
import futbol from '../assets/futbol.png';
import ai from '../assets/ai.png';
import constest from '../assets/contest.png';
import idea from '../assets/idea.png';
import React, { createContext, useState, useContext } from "react";

import laptop from '../assets/gifts/laptop.jpg';
import iphone from '../assets/gifts/i.jpeg';
import TV from '../assets/gifts/tv.png';
import pilesos from '../assets/gifts/pilesos.png';
import s from '../assets/gifts/ы.png';
// Block turi
type GiftType = {
    type: string;
    description: string;
    image?: string;
    count: number;
};

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
      { type: "planner", description: "Rejalashtiruvchi daftarchalar", image: s, count: 1 },
      { type: "smartwatch", description: "Smart soat", image: s, count: 2 },
      { type: "lamp", description: "Stol lampasi", image: s, count: 1 },
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
      { type: "samakat", description: "Samakat", image: s, count: 1 },
      { type: "tv", description: "Televizor", image: TV, count: 1 },
      { type: "robopilesos", description: "Robo Pilesos", image: pilesos, count: 1 },
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
      { type: "keyboard", description: "Klaviatura", image: s, count: 1 },
      { type: "tablet", description: "Planshet", image: s, count: 3 },
      { type: "smartlamp", description: "Smart lamp", image: s, count: 2 },
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
      { type: "nout", description: "Noutbuk", image: laptop, count: 2 },
      { type: "tv", description: "Televizor", image: TV, count: 2 },
      { type: "pilesos", description: "Robopilesos", image: pilesos, count: 2 },
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
      { type: "iphone", description: "iPhone 17", image: iphone, count: 1 },
      { type: "speaker", description: "Kalonka", image: s, count: 10 },
      { type: "termoz", description: "Termoz", image: s, count: 10 },
      { type: "thermocup", description: "Termokrushka", image: s, count: 10 },
      { type: "smartwatch", description: "Smart soat", image: s, count: 10 },
      { type: "headphones", description: "Naushnik", image: s, count: 10 },
      { type: "keyboard", description: "Klaviatura", image: s, count: 10 },
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