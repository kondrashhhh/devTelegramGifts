import React, {  } from 'react';
import styles from './Slider.module.scss'
import Slide from './Slide/Slide';

export default function Slider() {
  // const [slidesData, setSlidesData] = useState([]);
  // const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   async function fetchAssets() {
  //     try {
  //       const response = await fetch('/api/get-assets', {
  //         credentials: 'include',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         }
  //       })
  
  //       if (!response.ok) {
  //         throw new Error(`Сетевая ошибка: ${response.status}`);
  //       }
  
  //       const reader = response.body.getReader();
  //       const decoder = new TextDecoder('utf-8');
  //       let done = false;
  
  //       while (!done) {
  //         const { value, done: doneReading } = await reader.read();
  //         done = doneReading;
  //         if (value) {
  //           const chunk = decoder.decode(value, { stream: true });
  //           const resJSON = JSON.parse(chunk)
  //           console.log('Получен кусок:', resJSON);
  //           setSlidesData(prev => {
  //             const newSlidesData = [resJSON, ...prev];
              
  //             if (newSlidesData.length > 21) {
  //               newSlidesData.pop();
  //               setLoading(false);
  //             }
            
  //             return newSlidesData;
  //           });
  
  //         }
  //       }
  //     } catch (error) {
  //       console.error('Ошибка при получении данных:', error);
  //     } finally {
  //       console.log(slidesData);
  //     }
  //   }
  
  //   fetchAssets();
  // }, []);

  const items = [
    {name: "Diamond Ring", image: '/test.png'},
    {name: "Diamond Ring", image: '/test.png'},
    {name: "Diamond Ring", image: '/test.png'},
    {name: "Diamond Ring", image: '/test.png'},
    {name: "Diamond Ring", image: '/test.png'},
    {name: "Diamond Ring", image: '/test.png'},
    {name: "Diamond Ring", image: '/test.png'},
    {name: "Diamond Ring", image: '/test.png'},
    {name: "Diamond Ring", image: '/test.png'},
    {name: "Diamond Ring", image: '/test.png'},
    {name: "Diamond Ring", image: '/test.png'},
  ]

  return (
    <div className={styles.wrapper}>
      {items.map((slideData, index) => (
          <Slide
           key={index}
           src={slideData.image} 
           name={slideData.name} 
          />
      ))}
    </div>
  );
  
}
