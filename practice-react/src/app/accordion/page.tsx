'use client';

import { useState } from 'react';
import Pannel from './pannel';

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <h1>Almaty, Kazakhistan</h1>

      <Pannel
        title="About"
        isActive={activeIndex === 0}
        onShow={() => setActiveIndex(0)}
      >
        With a population of about 2 million, Almaty is Kazakhstan's largest
        city. From 1929 to 1997, it was its capital city.
      </Pannel>

      <Pannel
        title="Etymology"
        isActive={activeIndex === 1}
        onShow={() => setActiveIndex(1)}
      >
        The name comes from алма, the Kazakh word for "apple" and is often
        translated as "full of apples". In fact, the region surrounding Almaty
        is thought to be the ancestral home of the apple, and the wild Malus
        sieversii is considered a likely candidate for the ancestor of the
        modern domestic apple.
      </Pannel>
    </div>
  );
};

export default Accordion;
