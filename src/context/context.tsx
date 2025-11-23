// ...existing code...
import robosumo from '../assets/robosumo.png';
import futbol from '../assets/futbol.png';
import ai from '../assets/ai.png';
import constest from '../assets/contest.png';
import idea from '../assets/idea.png';
import React, { createContext, useState, useContext } from "react";
import contestGift from '../assets/gifts/contest.png';

import robof from '../assets/gifts/robo_fut.png';
import robofutbol from '../assets/gifts/robo_fut.png';
import aig from '../assets/gifts/Raqamli avlod to’plami (7)-edited-free (carve.photos).png';
import sumon from '../assets/gifts/sumo.png';
// import laptop from '../assets/gifts/lop.png';
// import iphone from '../assets/gifts/i.png';
// import TV from '../assets/gifts/tele.png';
// import pilesos from '../assets/gifts/piles.png';
// import s from '../assets/gifts/pil.png';
// import naush from '../assets/gifts/na.png';
// import key from '../assets/gifts/klav.png';
// import ter from '../assets/gifts/termiz.png';
// import kal from '../assets/gifts/kalon.png';
// import t from '../assets/gifts/ls-no-bg-preview (carve.photos).png';
// import rp from '../assets/gifts/piles.png';
// import sam from '../assets/gifts/sama.png';
// import sumk from '../assets/gifts/sumka.png';

// // Block turi
// type GiftType = {
//     type: string;
//     description: string;
//     image?: string;
//     count: number;
// };

interface BlockType {
  id: number;
  title: string;
  desc: string;
  image: string;
  size: 'small' | 'large';
  link: string;
  // gifts?: Gift[]; 
  img:string;
  date:string;
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
    date: "2025-12-11T09:00:00",
    img:robof,
    // gifts: [
    //   { type: "Noutbuk", description: "Noutbuk", image: laptop, count: 1 },
    //   { type: "Televizor", description: "Smart soat", image: TV, count: 2 },
    //   { type: "Robo pilesos", description: "Robot changyutgich", image: rp, count: 1 },
    // ],
  },
  {
    id: 2,
    title: 'Robo Sumo',
    desc: 'Robotlarning kuchli to‘qnashuv janglari.',
    image: robosumo,
    size: 'small',
    link: '/register/rsumo',
    img:sumon,
    date: "2025-12-11T09:00:00",
    // gifts: [
    //   { type: "samakat", description: "Samakat", image: s, count: 1 },
    //   { type: "tv", description: "Televizor", image: TV, count: 1 },
    //   { type: "robopilesos", description: "Robo Pilesos", image: pilesos, count: 1 },
    // ],
  },
  {
    id: 3,
    title: 'DG Contest',
    desc: 'Innovatsion musobaqalar va g‘oyalar.',
    image: constest,
    size: 'small',
    link: '/register/contest',
    img:contestGift,
    date: "2025-12-10T09:00:00",
    // gifts: [
    //   { type: "keyboard", description: "Klaviatura", image: key, count: 1 },
    //   { type: "tablet", description: "Planshet", image: s, count: 3 },
    //   { type: "smartlamp", description: "Smart lamp", image: s, count: 2 },
    // ],
  },
  {
    id: 4,
    title: 'Robo Futbol',
    desc: 'Robotlar futbol maydonida 2x2 futbol oyini.',
    image: futbol,
    size: 'small',
    link: '/register/rfutbol',
    date: "2025-12-12T09:00:00",
    img:robofutbol,
    // gifts: [
    //   { type: "nout", description: "Noutbuk", image: laptop, count: 2 },
    //   { type: "tv", description: "Televizor", image: TV, count: 2 },
    //   { type: "pilesos", description: "Robopilesos", image: pilesos, count: 2 },
    // ],
  },
  {
    id: 5,
    title: "AI Day (prompt)",
    desc: "Sun'iy intellektning yangi chegaralarini kashf qiling.",
    image: ai,
    size: "large",
    link: "/register/ai",
    date: "2025-12-13T09:00:00",
    img:aig,
    // gifts: [
    //   { type: "iphone", description: "iPhone 17", image: iphone, count: 1 },
    //   { type: "speaker", description: "Kalonka", image: kal, count: 10 },
    //   { type: "termoz", description: "Termoz", image: ter, count: 10 },
    //   { type: "thermocup", description: "Termokrushka", image: t, count: 10 },
    //   { type:'sumka', description: "Sumka", image: sumk, count: 10 },
    //   { type: "headphones", description: "Naushnik", image: naush, count: 10 },
    //   { type: "keyboard", description: "Klaviatura", image: key, count: 10 },
    // ],
  }
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