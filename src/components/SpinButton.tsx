import React, { useState, MouseEvent } from 'react';
import './SpinButton.css';

const MIN_COUNT = 0;
const MAX_COUNT = 3;
const LABEL = '성인';

const SpinButton: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);
  const [announceText, setAnnounceText] = useState<string>('');

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
    setAnnounceText(`${LABEL} 승객 추가 ${count + 1}`);
  };

  const decrement = () => {
    setCount((prevCount) => prevCount - 1);
    setAnnounceText(`${LABEL} ${count - 1} 텍스트 숫자만 수정`);
  };

  const toggleTooltip = (event: MouseEvent<HTMLDivElement>) => {
    setIsTooltipVisible(!isTooltipVisible);
  };

  const resetAnnounceText = () => {
    setAnnounceText('');
  };

  return (
    <section className='spinButtonContainer'>
      <div>
        <h1>승객 선택</h1>
        <div className='spinButtonLabel'>
          <label>{LABEL}</label>
          <div
            className='helpIcon'
            onMouseEnter={toggleTooltip}
            onMouseLeave={toggleTooltip}
          >
            ?
            {isTooltipVisible && (
              <span className='tooltip'>
                최대 인원수는 {MAX_COUNT}명까지 가능합니다
              </span>
            )}
          </div>
        </div>
        <button
          type='button'
          onClick={decrement}
          onBlur={resetAnnounceText}
          className='spinButton'
          disabled={count <= MIN_COUNT}
          aria-label={`${LABEL} 탑승자 한명 줄이기`}
        >
          -
        </button>
        <input
          type='text'
          role='spinbutton'
          readOnly
          className='spinButtonInput'
          value={count}
        />
        <div
          className='hidden'
          aria-atomic={true}
          aria-relevant='additions'
          aria-live='polite'
        >
          {announceText && <p className='hidden'>{announceText}</p>}
        </div>
        <button
          type='button'
          onClick={increment}
          onBlur={resetAnnounceText}
          className='spinButton'
          disabled={count >= MAX_COUNT}
          aria-label={`${LABEL} 탑승자 한명 늘리기`}
        >
          +
        </button>
      </div>
    </section>
  );
};

export default SpinButton;
