import React, {
  Dispatch,
  FC,
  Fragment,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

interface IProps {
  getValue: Dispatch<SetStateAction<string>>;
}

/**
 * @author
 * @function @RotateSlider
 **/

export const RotateSlider: FC<IProps> = (props) => {
  const [Direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [Degree, setDegree] = useState('0');
  const sliderRef = useRef<HTMLElement>(null);

  const handleScrollEnd = () => {
    const slider = sliderRef.current;
    if (slider) {
      if (slider.scrollLeft > 530 && slider.scrollLeft < 558)
        slider.scrollTo(544, 0);
    }
  };

  const ListenToSliderScroll = () => {
    const slider = sliderRef.current;
    if (slider) {
      const sliderValue = slider.scrollLeft.toString().split('.')[0];
      const sliderMaxValue = slider.scrollWidth - slider.clientWidth;
      const ScrollToDegree =
        (((360 * parseInt(sliderValue)) /
          parseInt(sliderMaxValue.toString().split('.')[0])) *
          Math.PI) /
        12.6;
      if (slider.scrollLeft === 0) {
        setDegree('45');
        props.getValue('-45');
      } else if (slider.scrollLeft === sliderMaxValue) {
        props.getValue('45');
      } else if (slider.scrollLeft < 531) {
        const getDegreeValue =
          44 - parseInt(ScrollToDegree.toString().split('.')[0]);
        setDegree(getDegreeValue.toString().split('.')[0]);
        props.getValue('-' + getDegreeValue.toString().split('.')[0]);
        setDirection('left');
      } else if (slider.scrollLeft > 557) {
        const getDegreeValue = Math.abs(
          44.6 - parseInt(ScrollToDegree.toString().split('.')[0])
        );
        setDegree(getDegreeValue.toString().split('.')[0]);
        props.getValue(getDegreeValue.toString().split('.')[0]);
        setDirection('right');
      } else {
        setDegree('0');
      }
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', ListenToSliderScroll);
    }
    return () => {
      if (slider) {
        slider.removeEventListener('scroll', ListenToSliderScroll);
      }
    };
  }, [sliderRef]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.scrollTo({ left: 544, top: 0, behavior: 'instant' });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="w-full flex flex-col h-[71px] min-h-[71px] relative items-center justify-center box-border overflow-hidden">
      <div className="w-full text-center cursor-default font-normal text-md ml-3 text-white">{`${Degree} °`}</div>
      <div className="w-full max-w-[700px] opacity-gradient relative justify-center items-center flex flex-col box-border overflow-hidden">
        <ScrollContainer
          component="ul"
          vertical={false}
          horizontal={true}
          hideScrollbars={true}
          onEndScroll={handleScrollEnd}
          innerRef={sliderRef}
          className="w-full relative box-border px-[50%] py-4 space-x-2 whitespace-nowrap cursor-ew-resize scroll-smooth scrollbar-hide items-center justify-center"
        >
          <SliderComponent value={Degree} direction={Direction} />
        </ScrollContainer>
        <div className="absolute touch-none pointer-events-none h-full left-0 top-0 w-full flex items-center justify-center">
          <div className="flex touch-none pointer-events-none h-6 w-2 bg-white rounded-full" />
        </div>
      </div>
    </div>
  );
};

interface SliderComponentProps {
  value: string;
  direction: 'left' | 'right' | null;
}

const SliderComponent: FC<SliderComponentProps> = (props) => {
  const setLeftOpacity = (key: number) => {
    if (key > 45 - parseInt(props.value) && props.direction === 'left')
      return 'opacity-100' as string;
    else return 'opacity-50' as string;
  };

  const setRightOpacity = (key: number) => {
    if (key - 47 < parseInt(props.value) && props.direction === 'right')
      return 'opacity-100' as string;
    else return 'opacity-50' as string;
  };

  const DotClassname =
    'h-1 w-1 min-h-1 min-w-1 my-1.5 inline-block rounded-full bg-white';
  const LineClassname =
    'h-3 w-1 min-h-3 min-w-1 mb-[2px] inline-block rounded-full bg-white';
  const CenterLineClassname =
    'h-4 w-2 min-w-1 min-h-4 inline-block rounded-full border-2 border-solid border-white';

  return (
    <Fragment>
      <li key={1} className={`${setLeftOpacity(1)} ${LineClassname}`} />
      <li key={2} className={`${setLeftOpacity(2)} ${DotClassname}`} />
      <li key={3} className={`${setLeftOpacity(3)} ${DotClassname}`} />
      <li key={4} className={`${setLeftOpacity(4)} ${DotClassname}`} />
      <li key={5} className={`${setLeftOpacity(5)} ${DotClassname}`} />
      <li key={6} className={`${setLeftOpacity(6)} ${LineClassname}`} />
      <li key={7} className={`${setLeftOpacity(7)} ${DotClassname}`} />
      <li key={8} className={`${setLeftOpacity(8)} ${DotClassname}`} />
      <li key={9} className={`${setLeftOpacity(9)} ${DotClassname}`} />
      <li key={10} className={`${setLeftOpacity(10)} ${DotClassname}`} />
      <li key={11} className={`${setLeftOpacity(11)} ${LineClassname}`} />
      <li key={12} className={`${setLeftOpacity(12)} ${DotClassname}`} />
      <li key={13} className={`${setLeftOpacity(13)} ${DotClassname}`} />
      <li key={14} className={`${setLeftOpacity(14)} ${DotClassname}`} />
      <li key={15} className={`${setLeftOpacity(15)} ${DotClassname}`} />
      <li key={16} className={`${setLeftOpacity(16)} ${LineClassname}`} />
      <li key={17} className={`${setLeftOpacity(17)} ${DotClassname}`} />
      <li key={18} className={`${setLeftOpacity(18)} ${DotClassname}`} />
      <li key={19} className={`${setLeftOpacity(19)} ${DotClassname}`} />
      <li key={20} className={`${setLeftOpacity(20)} ${DotClassname}`} />
      <li key={21} className={`${setLeftOpacity(21)} ${LineClassname}`} />
      <li key={22} className={`${setLeftOpacity(22)} ${DotClassname}`} />
      <li key={23} className={`${setLeftOpacity(23)} ${DotClassname}`} />
      <li key={24} className={`${setLeftOpacity(24)} ${DotClassname}`} />
      <li key={25} className={`${setLeftOpacity(25)} ${DotClassname}`} />
      <li key={26} className={`${setLeftOpacity(26)} ${LineClassname}`} />
      <li key={27} className={`${setLeftOpacity(27)} ${DotClassname}`} />
      <li key={28} className={`${setLeftOpacity(28)} ${DotClassname}`} />
      <li key={29} className={`${setLeftOpacity(29)} ${DotClassname}`} />
      <li key={30} className={`${setLeftOpacity(30)} ${DotClassname}`} />
      <li key={31} className={`${setLeftOpacity(31)} ${LineClassname}`} />
      <li key={32} className={`${setLeftOpacity(32)} ${DotClassname}`} />
      <li key={33} className={`${setLeftOpacity(33)} ${DotClassname}`} />
      <li key={34} className={`${setLeftOpacity(34)} ${DotClassname}`} />
      <li key={35} className={`${setLeftOpacity(35)} ${DotClassname}`} />
      <li key={36} className={`${setLeftOpacity(36)} ${LineClassname}`} />
      <li key={37} className={`${setLeftOpacity(37)} ${DotClassname}`} />
      <li key={38} className={`${setLeftOpacity(38)} ${DotClassname}`} />
      <li key={39} className={`${setLeftOpacity(39)} ${DotClassname}`} />
      <li key={40} className={`${setLeftOpacity(40)} ${DotClassname}`} />
      <li key={41} className={`${setLeftOpacity(41)} ${LineClassname}`} />
      <li key={42} className={`${setLeftOpacity(42)} ${DotClassname}`} />
      <li key={43} className={`${setLeftOpacity(43)} ${DotClassname}`} />
      <li key={44} className={`${setLeftOpacity(44)} ${DotClassname}`} />
      <li key={45} className={`${setLeftOpacity(45)} ${DotClassname}`} />
      <li key={46} className={CenterLineClassname} />
      <li key={47} className={`${setRightOpacity(47)} ${DotClassname}`} />
      <li key={48} className={`${setRightOpacity(48)} ${DotClassname}`} />
      <li key={49} className={`${setRightOpacity(49)} ${DotClassname}`} />
      <li key={50} className={`${setRightOpacity(50)} ${DotClassname}`} />
      <li key={51} className={`${setRightOpacity(51)} ${LineClassname}`} />
      <li key={52} className={`${setRightOpacity(52)} ${DotClassname}`} />
      <li key={53} className={`${setRightOpacity(53)} ${DotClassname}`} />
      <li key={54} className={`${setRightOpacity(54)} ${DotClassname}`} />
      <li key={55} className={`${setRightOpacity(55)} ${DotClassname}`} />
      <li key={56} className={`${setRightOpacity(56)} ${LineClassname}`} />
      <li key={57} className={`${setRightOpacity(57)} ${DotClassname}`} />
      <li key={58} className={`${setRightOpacity(58)} ${DotClassname}`} />
      <li key={59} className={`${setRightOpacity(59)} ${DotClassname}`} />
      <li key={60} className={`${setRightOpacity(60)} ${DotClassname}`} />
      <li key={61} className={`${setRightOpacity(61)} ${LineClassname}`} />
      <li key={62} className={`${setRightOpacity(62)} ${DotClassname}`} />
      <li key={63} className={`${setRightOpacity(63)} ${DotClassname}`} />
      <li key={64} className={`${setRightOpacity(64)} ${DotClassname}`} />
      <li key={65} className={`${setRightOpacity(65)} ${DotClassname}`} />
      <li key={66} className={`${setRightOpacity(66)} ${LineClassname}`} />
      <li key={67} className={`${setRightOpacity(67)} ${DotClassname}`} />
      <li key={68} className={`${setRightOpacity(68)} ${DotClassname}`} />
      <li key={69} className={`${setRightOpacity(69)} ${DotClassname}`} />
      <li key={70} className={`${setRightOpacity(70)} ${DotClassname}`} />
      <li key={71} className={`${setRightOpacity(71)} ${LineClassname}`} />
      <li key={72} className={`${setRightOpacity(72)} ${DotClassname}`} />
      <li key={73} className={`${setRightOpacity(73)} ${DotClassname}`} />
      <li key={74} className={`${setRightOpacity(74)} ${DotClassname}`} />
      <li key={75} className={`${setRightOpacity(75)} ${DotClassname}`} />
      <li key={76} className={`${setRightOpacity(76)} ${LineClassname}`} />
      <li key={77} className={`${setRightOpacity(77)} ${DotClassname}`} />
      <li key={78} className={`${setRightOpacity(78)} ${DotClassname}`} />
      <li key={79} className={`${setRightOpacity(79)} ${DotClassname}`} />
      <li key={80} className={`${setRightOpacity(80)} ${DotClassname}`} />
      <li key={81} className={`${setRightOpacity(81)} ${LineClassname}`} />
      <li key={82} className={`${setRightOpacity(82)} ${DotClassname}`} />
      <li key={83} className={`${setRightOpacity(83)} ${DotClassname}`} />
      <li key={84} className={`${setRightOpacity(84)} ${DotClassname}`} />
      <li key={85} className={`${setRightOpacity(85)} ${DotClassname}`} />
      <li key={86} className={`${setRightOpacity(86)} ${LineClassname}`} />
      <li key={87} className={`${setRightOpacity(87)} ${DotClassname}`} />
      <li key={88} className={`${setRightOpacity(88)} ${DotClassname}`} />
      <li key={89} className={`${setRightOpacity(89)} ${DotClassname}`} />
      <li key={90} className={`${setRightOpacity(90)} ${DotClassname}`} />
      <li key={91} className={`${setRightOpacity(91)} ${LineClassname}`} />
    </Fragment>
  );
};
