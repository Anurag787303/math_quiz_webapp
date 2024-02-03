import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import './Select.css';
import selectImgLeft from '../Assets/select-image.png';

const Select = () => {
  // State for question 1
  const [selectedOptionQ1, setSelectedOptionQ1] = useState(null);
  const [backgroundColorQ1, setBackgroundColorQ1] = useState('#D3FFE7');

  // Function to handle option selection and color change for question 1
  const handleColorChangeQ1 = (id) => {
    if (selectedOptionQ1 === id) {
      // Deselect the same option and reset color
      setSelectedOptionQ1(null);
      setBackgroundColorQ1('#D3FFE7');
    } else {
      // Set the newly selected option and change color
      setSelectedOptionQ1(id);
      setBackgroundColorQ1('#08603B');
    }
  };

  // State for question 2
  const [selectedOptionQ2, setSelectedOptionQ2] = useState(null);
  const [backgroundColorQ2, setBackgroundColorQ2] = useState('#D3FFE7');

  // Function to handle option selection and color change for question 2
  const handleColorChangeQ2 = (id) => {
    if (selectedOptionQ2 === id) {
      // Deselect the same option and reset color
      setSelectedOptionQ2(null);
      setBackgroundColorQ2('#D3FFE7');
    } else {
      // Set the newly selected option and change color
      setSelectedOptionQ2(id);
      setBackgroundColorQ2('#604C08');
    }
  };

  return (
    <Layout>
      <div className='select-body'>
        <div className='select-image'><img src={selectImgLeft} alt="select"/></div>
        <div className='content'>
          <div className='Q1'>
            <div className={`option ${selectedOptionQ1 === 'Q1-option1' ? 'selected' : ''}`} id='Q1-option1' style={{ backgroundColor: selectedOptionQ1 === 'Q1-option1' ? backgroundColorQ1 : '#D3FFE7' }} onClick={() => handleColorChangeQ1('Q1-option1')}>23</div>
            <div className='join'></div>
            <div className={`option ${selectedOptionQ1 === 'Q1-option2' ? 'selected' : ''}`} id='Q1-option2' style={{ backgroundColor: selectedOptionQ1 === 'Q1-option2' ? backgroundColorQ1 : '#D3FFE7' }} onClick={() => handleColorChangeQ1('Q1-option2')}>42</div>
            <div className='join'></div>
            <div className={`option ${selectedOptionQ1 === 'Q1-option3' ? 'selected' : ''}`} id='Q1-option3' style={{ backgroundColor: selectedOptionQ1 === 'Q1-option3' ? backgroundColorQ1 : '#D3FFE7' }} onClick={() => handleColorChangeQ1('Q1-option3')}>81</div>
            <div className='join'></div>
            <div className={`option ${selectedOptionQ1 === 'Q1-option4' ? 'selected' : ''}`} id='Q1-option4' style={{ backgroundColor: selectedOptionQ1 === 'Q1-option4' ? backgroundColorQ1 : '#D3FFE7' }} onClick={() => handleColorChangeQ1('Q1-option4')}>11</div>
          </div>
          <div className='Q2'>
            <div className={`option ${selectedOptionQ2 === 'Q2-option1' ? 'selected' : ''}`} id='Q2-option1' style={{ backgroundColor: selectedOptionQ2 === 'Q2-option1' ? backgroundColorQ2 : '#D3FFE7' }} onClick={() => handleColorChangeQ2('Q2-option1')}>12</div>
            <div className='join'></div>
            <div className={`option ${selectedOptionQ2 === 'Q2-option2' ? 'selected' : ''}`} id='Q2-option2' style={{ backgroundColor: selectedOptionQ2 === 'Q2-option2' ? backgroundColorQ2 : '#D3FFE7' }} onClick={() => handleColorChangeQ2('Q2-option2')}>9</div>
            <div className='join'></div>
            <div className={`option ${selectedOptionQ2 === 'Q2-option3' ? 'selected' : ''}`} id='Q2-option3' style={{ backgroundColor: selectedOptionQ2 === 'Q2-option3' ? backgroundColorQ2 : '#D3FFE7' }} onClick={() => handleColorChangeQ2('Q2-option3')}>-15</div>
            <div className='join'></div>
            <div className={`option ${selectedOptionQ2 === 'Q2-option4' ? 'selected' : ''}`} id='Q2-option4' style={{ backgroundColor: selectedOptionQ2 === 'Q2-option4' ? backgroundColorQ2 : '#D3FFE7' }} onClick={() => handleColorChangeQ2('Q2-option4')}>91</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Select;
