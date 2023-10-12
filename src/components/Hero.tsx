import { useSpring, animated } from 'react-spring'
// import DownChevron from '/svg/chevrons-down.svg'

type Props = {
  showMain: boolean
  handleShowMain: React.MouseEventHandler<HTMLButtonElement>
};

export const Hero = ({ showMain, handleShowMain }: Props) => {

  const appear = useSpring(
    {
      from: { opacity: 0 },
      to: { opacity: 1 },
      config: { duration: 2500 }
    }
  );

  return (
    <>
      <animated.div style={appear} className='hero'>
        <img src='bitmoji.png' alt='bitmoji' />
        <h3>Hi, I'm Kyle</h3>
        <h4>
          I build software that leverage machine intelligence and data
        </h4>
        {/* <NetworkVisualization data={data} /> */}
      </animated.div>

      {!showMain &&
        <button id="scrollBtn" onClick={handleShowMain}>
          {/* <img src={DownChevron} alt='chevron-down' className='svg'/> */}
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevrons-down"><polyline points="7 13 12 18 17 13"/><polyline points="7 6 12 11 17 6"/></svg>
        </button>
      }
    </>

  )
}
