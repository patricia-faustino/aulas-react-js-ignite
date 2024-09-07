import {Header} from './components/Header';
import {Sidebar} from './components/Sidebar';
import {Post} from './components/Post';

import './global.css';
import styles from './App.module.css';

// JSX = JavaScript + XML

const posts = [
  {
      id: 1,
      author: {
          name: 'Patricia Faustino',
          urlSrc: 'https://github.com/patricia-faustino.png',
          role: 'Software Enginnering'
      },
      content : [
          {type: 'paragraph', content: 'Fala galeraa 👋'},
          {type: 'link', content: 'jane.design/doctorcare'},
      ],
      publishedAt: new Date('2024-08-05 20:00:00'),
  },
  {
      id: 2,
      author: {
          name: 'Namjoon',
          urlSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbQONRqTKM_vVvIO71Ws8Q3nqrvPeZAw3G3Q&s',
          role: 'Dono da porra toda'
      },
      content : [
          {type: 'paragraph', content: 'Fala galeraa 👋'},
          {type: 'link', content: 'jane.design/doctorcare'},
      ],
      publishedAt: new Date('2024-08-05 21:00:00'),
  }
]

function App() {
  return (
     <div>
        <Header />

       <div className={styles.wrapper}>
          <Sidebar />
          <main>
                  {posts.map(post => 
                      <Post 
                       key={post.id}
                       author={post.author}
                       content={post.content} 
                       publishedAt={post.publishedAt} 
                      />
                    )}

                 
          </main>
       </div>
     </div>
  )
}

export default App
