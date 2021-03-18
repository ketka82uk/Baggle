import React from 'react'

export default function About() {


  return <div className="main">
    
    <section className="section">
      <div className="container">
        <div className='has-text-centered is-size-3 '>
          <h1 >Technologies used</h1>
        </div>

        <div className='columns is-multiline is-mobile is-three-quarters'>
          <div className="column is-one-fifth-desktop is-half-tablet is-half-mobile">
            <figure className='image is-128x128'>
              <img className='is-rounded' src='https://www.python.org/static/opengraph-icon-200x200.png'></img>
            </figure>
          </div>
          <div className="column is-one-fifth-desktop is-half-tablet is-half-mobile">
            <figure className='image is-128x128'>
              <img className='is-rounded' src='https://thumbs.dreamstime.com/b/javascript-logo-javascript-logo-white-background-vector-format-available-136765881.jpg'></img>
            </figure>
          </div>
          <div className="column is-one-fifth-desktop is-half-tablet is-half-mobile">
            <figure className='image is-128x128'>
              <img className='is-rounded' src='https://pythonforundergradengineers.com/posts/zappa/images/flask_icon.png'></img>
            </figure>
          </div>
          <div className="column is-one-fifth-desktop is-half-tablet is-half-mobile">
            <figure className='image is-128x128'>
              <img className='is-rounded' src='https://miro.medium.com/max/3332/0*ok6yuDnTx4o2PSFx.png'></img>
            </figure>
          </div>
          <div className="column is-one-fifth-desktop is-half-tablet is-half-mobile">
            <figure className='image is-128x128'>
              <img className='is-rounded' src='https://bulma.io/images/bulma-banner.png'></img>
            </figure>
          </div>
        </div>
      </div>
    </section>

    <section className="section">
      <div className="container has-text-centered is-size-5">
        <p>Baggle was created by <a href="https://github.com/aozzy" target="_blank" rel="noopener noreferrer">Abdi</a>, <a href="https://github.com/ketka82uk" target="_blank" rel="noopener noreferrer">Cathy</a> and <a href="https://github.com/jamesNicholasRyan" target="_blank" rel="noopener noreferrer">James</a>. You can find the source code 
          <a href="placeholderurl"> here</a> </p>
        <p>We were inspired by the story of the <a href="https://en.wikipedia.org/wiki/One_red_paperclip" target="_blank" rel="noopener noreferrer">red paperclip</a>, where Kylie MacDonald bartered his way from a single red paperclip to a house in a series of fourteen online trades over the course of a year. You can find his original blog <a href="http://oneredpaperclip.blogspot.com/" target="_blank" rel="noopener noreferrer">here</a></p>
      </div>
      <div className='columns has-text-centered is-half'>
        <div className='column is-half'>
          <img src={'https://upload.wikimedia.org/wikipedia/commons/1/1c/One_red_paperclip.jpg'}></img>
        </div>
        <div className='column is-half'>
          <img src={'https://upload.wikimedia.org/wikipedia/commons/b/b4/Red-paperclip-news-1.jpg'}></img>
        </div>
      </div>

    </section>

  </div>
}

