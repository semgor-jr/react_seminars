import React, { useEffect, useState } from 'react';

const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};


const MessageCounter = () => {
  const [count, setCount] = useState(0);
  const [lastMessageDate, setLastMessageDate] = useState(new Date());

  useEffect(() => {
    const randomNumber = getRandomInt(1, 10);
    setCount(randomNumber);
  }, []);

  const pluralize = (n: number, one: string, few: string, many: string) => {
    const n10 = n % 10;
    const n100 = n % 100;
    if (n10 === 1 && n100 !== 11) return one;
    if (n10 >= 2 && n10 <= 4 && (n100 < 12 || n100 > 14)) return few;
    return many;
  };

  const messageText = pluralize(count, 'сообщение', 'сообщения', 'сообщений');

  return (
    <div>
      У вас {count} {messageText}
      <br/>
      (последнее: {formatDate(lastMessageDate)})
    </div>
  );
};

export default MessageCounter;