import { useSpring, animated } from 'react-spring'
// import DownChevron from '/svg/chevrons-down.svg'


export const Hero = () => {

  const appear = useSpring(
    {
      from: { opacity: 0 },
      to: { opacity: 1 },
      config: { duration: 2500 }
    }
  );



  return (
    <>
      <animated.div style={appear} className="hero text-neutral-100">
        <div className='hero-header'>
          <img src='intro-bitmoji.png' alt='intro-bitmoji' />
          <h5>Hi, I'm Kyle</h5>
        </div>
        <h4>
          I build software that leverage ai & data
        </h4>
        {/* <NetworkVisualization data={data} /> */}
      </animated.div>
    </>

  )
}
