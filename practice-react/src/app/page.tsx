'use client';
import Image from 'next/image';

import { useState } from 'react';

export default function Home() {
  const [count, setCount] = useState(0);

  const handleCount = () => {
    setCount(count + 1);
  };

  return <main></main>;
}
