import React from 'react'

export default function TechIcon(props) {
  const { icon } = props
  
  if(icon == 'node') return <i className='fab fa-node' />

  if(icon == 'html5') return <i className='fab fa-html5' />

  if(icon == 'css3') return <i className='fab fa-css3' />

  if(icon == 'sass') return <i className='fab fa-sass' />

  if(icon == 'less') return <i className='fab fa-less' />

  if(icon == 'python')return <i className='fab fa-python' />

  if(icon == 'js') return <i className='fab fa-js' />

  if(icon == 'angular') return <i className='fab fa-angular' />

  if(icon == 'wp') return <i className='fab fa-wordpress' />

  if(icon == 'adaptive') return <i className='fas fa-mobile-alt' />

  if(icon == 'react') return <i className='fab fa-react' />

  if(icon == 'ember') return <i className='fab fa-ember' />

  if(icon == 'gulp') return <i className='fab fa-gulp' />

  if(icon == 'git') return <i className='fab fa-git' />

  if(icon == 'apple') return <i className='fab fa-apple' />

  if(icon == 'android') return <i className='fab fa-android' />

  return icon
}