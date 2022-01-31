import React from 'react';
import Markdown from 'markdown-to-jsx';
import { render } from 'react-dom';




function About() {
    return (
        <>
        
        <h1 className='text-6xl mb-4'>Github Stalk</h1>
        <p className='mb-4 text-2xl font-light'>
                A React app to search GitHub profiles and see profile details. 
                
        </p>
        <p className='text-lg text-gray-400'>
          Version <span className='text-gray-800'>1.0.0</span>
        </p>
        <p className='text-lg text-gray-400'>
          Layout By: 
          <a className='text-gray-800 mx-1' href='https://twitter.com/hassibmoddasser'>
             Hassib Moddasser
          </a>
        </p>
      </>
    )
  }
  
  export default About