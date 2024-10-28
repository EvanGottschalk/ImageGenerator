import React from 'react'
import About from '../../components/about/About'
import Services from '../../components/services/Services'
import Animation from '../../components/animation/Animation'
//import Roadmap from '../../components/roadmap/Roadmap'
//import Team from '../../components/team/Team'
//import FAQ from '../../components/faq/FAQ'


import Banner from '../../components/banner/Banner'
//import PageDescription from '../../components/pagedescription/PageDescription'
//import GetStarted from '../../components/getstarted/GetStarted'
//import EvolutionDescription from '../../components/evolutiondescription/EvolutionDescription'

import './main.css'

const Main = () => {
  return (
    <div className='main'>
      <Banner />
      <About />
      <Services />
      <Animation />
    </div>
  )
}

export default Main
