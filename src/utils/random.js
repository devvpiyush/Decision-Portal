// Small random helpers used across the project

export const rand = (min, max) => min + Math.random() * (max - min);

export const pick = (list) => list[Math.floor(Math.random() * list.length)];
