import React, { useState, useEffect, useRef } from 'react';
import style from './style.scss';
import { FixedProgressProps } from 'web-router';
import { createPortal } from 'react-dom';

const container = document.querySelector('#root') || document.body;

export default function FixedProgress({ show }: FixedProgressProps) {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalId = useRef<number>();
  const time = useRef(0);
  useEffect(() => {
    if (show) {
      setVisible(true);
      setProgress(0);
      time.current = 0;
      intervalId.current = setInterval(() => {
        time.current += 300;
        setProgress(getProgress(time.current));
      }, 300);
      return () => clearInterval(intervalId.current);
    } else {
      setProgress(100);
      return undefined;
    }
  }, [show]);
  useEffect(() => {
    if (progress >= 100) {
      clearInterval(intervalId.current);
      const id = setTimeout(() => {
        setVisible(false);
      }, 300);
      return () => clearTimeout(id);
    }
    return undefined;
  }, [progress]);

  return (
    visible &&
    createPortal(
      <div className={style.outer}>
        <div className={style.inner} style={{ width: `${progress}%` }} />
      </div>,
      container
    )
  );
}

/**
 * 3000 -> 80
 * 算了, 吃了数学不好的亏
 * @param time ms
 */
function getProgress(time: number) {
  return Math.log(time) * 7;
}
