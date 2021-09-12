import React, { useEffect, useState } from 'react';

import { db } from '@/intergations/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { v4 } from 'uuid'

import Data from '@/canvas/utils/InitialsLayer.json'
import TextBox from '@/canvas/objects/TextBox'


import Style from './Style'

interface Props {
  canvas: any;
}

const Index = ({ canvas }: Props) => {
  const [fonts, setFonts] = useState([])

  useEffect(() => {
    const fetchsData = async () => {
      const fontsData = []
      const querySnapshot = await getDocs(collection(db, "tests"));
      querySnapshot.forEach((doc) => {
        fontsData.push(doc.data())
      });

      setFonts(fontsData)
    }

    fetchsData()
  }, [])

  const handleAddTextBox = (font: any) => {
    const initDynamic = Data.Layers[0]
    initDynamic.src = font.url
    initDynamic.fontFamily = font.name
    const newTextBoxPro = new TextBox({ ...Data.Layers[1], id: v4() })

    canvas.add(newTextBoxPro)
    canvas.setActiveObject(newTextBoxPro);
    canvas.renderAll()
  }

  return (
    <Style>
      <ul>
        {fonts.map((font, index) => (
          <li onClick={() => handleAddTextBox(font)} key={index}>
            <h2>The quick brown fox jumps over the lazy dog</h2>
            <p>{font.name}</p>
          </li>
        ))}
      </ul>
    </Style>
  );
}

export default Index;